import { NextResponse } from "next/server";
import { driver } from "@/lib/cognodb";

/**
 * Disease Similarity API
 * 
 * Finds diseases similar to the given disease based on shared symptoms.
 * This demonstrates a complex graph query that would be difficult in SQL:
 * - Multi-hop traversal (3+ hops)
 * - Set intersection logic
 * - Pattern matching across multiple paths
 * 
 * Graph path:
 * (Disease A)-[:HAS_SYMPTOM]->(Symptom)<-[:HAS_SYMPTOM]-(Disease B)
 * 
 * This "bidirectional symptom matching" pattern is natural in graphs
 * but requires complex self-joins and subqueries in SQL.
 */
export async function GET(
  request: Request,
  {
    params,
  }: {
    params: Promise<{ diseaseName: string }>;
  }
) {
  const session = driver.session();

  try {
    const { diseaseName } = await params;

    // Complex multi-hop graph query for disease similarity
    // Using bidirectional pattern: Disease -> Symptom <- Disease
    const result = await session.run(
      `
      MATCH (targetDisease:Disease {name: $diseaseName})
      MATCH (targetDisease)-[:HAS_SYMPTOM]->(symptom:Symptom)
      
      WITH targetDisease, collect(DISTINCT symptom) AS targetSymptoms
      
      // Find other diseases through shared symptoms (3-hop pattern)
      MATCH (targetDisease)-[:HAS_SYMPTOM]->(sharedSymptom:Symptom)<-[:HAS_SYMPTOM]-(otherDisease:Disease)
      WHERE otherDisease <> targetDisease
      
      // Get all symptoms for both diseases
      MATCH (otherDisease)-[:HAS_SYMPTOM]->(otherSymptom:Symptom)
      
      WITH 
        targetDisease,
        otherDisease,
        targetSymptoms,
        collect(DISTINCT otherSymptom) AS otherSymptoms,
        collect(DISTINCT sharedSymptom) AS sharedSymptoms
      
      // Calculate Jaccard similarity
      WITH
        otherDisease,
        [s IN sharedSymptoms | s.name] AS sharedSymptomNames,
        [s IN targetSymptoms | s.name] AS targetSymptomNames,
        [s IN otherSymptoms | s.name] AS otherSymptomNames,
        size(sharedSymptoms) AS intersectionSize,
        size(targetSymptoms) + size(otherSymptoms) - size(sharedSymptoms) AS unionSize
      
      // Get affected species
      OPTIONAL MATCH (species:Species)-[:HAS_DISEASE]->(otherDisease)
      
      RETURN
        otherDisease.name AS diseaseName,
        otherDisease.description AS description,
        sharedSymptomNames AS sharedSymptoms,
        otherSymptomNames AS allSymptoms,
        collect(DISTINCT species.name) AS affectedSpecies,
        intersectionSize,
        unionSize,
        CASE 
          WHEN unionSize > 0 THEN toFloat(intersectionSize) / toFloat(unionSize)
          ELSE 0.0
        END AS similarityScore
      
      ORDER BY similarityScore DESC, intersectionSize DESC
      LIMIT 5
      `,
      { diseaseName }
    );

    if (result.records.length === 0) {
      return NextResponse.json({
        success: true,
        disease: diseaseName,
        similarDiseases: [],
        message: "No similar diseases found",
      });
    }

    const similarDiseases = result.records.map((record) => {
      const similarityScore = record.get("similarityScore");
      const intersectionSize = record.get("intersectionSize").toNumber();
      const unionSize = record.get("unionSize").toNumber();

      return {
        name: record.get("diseaseName"),
        description: record.get("description"),
        sharedSymptoms: record.get("sharedSymptoms"),
        allSymptoms: record.get("allSymptoms"),
        affectedSpecies: record.get("affectedSpecies").filter(Boolean),
        similarity: {
          score: parseFloat((similarityScore * 100).toFixed(1)),
          sharedSymptomCount: intersectionSize,
          totalUniqueSymptoms: unionSize,
        },
      };
    });

    return NextResponse.json({
      success: true,
      disease: diseaseName,
      similarDiseases,
    });
  } catch (error) {
    console.error("Similar diseases API error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to find similar diseases",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  } finally {
    await session.close();
  }
}
