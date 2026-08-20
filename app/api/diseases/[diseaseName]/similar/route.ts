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
    const result = await session.run(
      `
      // Start with the target disease
      MATCH (targetDisease:Disease {name: $diseaseName})
      
      // Get all symptoms of the target disease
      MATCH (targetDisease)-[:HAS_SYMPTOM]->(targetSymptom:Symptom)
      
      // Find other diseases that share ANY of these symptoms
      // This creates a 3-hop path: Disease -> Symptom <- Disease
      MATCH (otherDisease:Disease)-[:HAS_SYMPTOM]->(sharedSymptom:Symptom)
      WHERE sharedSymptom IN collect(targetSymptom)
        AND otherDisease <> targetDisease
      
      // Collect all symptoms for both diseases to calculate similarity
      WITH 
        targetDisease,
        otherDisease,
        collect(DISTINCT sharedSymptom.name) AS sharedSymptoms
      
      // Get all symptoms of the target disease for comparison
      MATCH (targetDisease)-[:HAS_SYMPTOM]->(allTargetSymptoms:Symptom)
      WITH 
        targetDisease,
        otherDisease,
        sharedSymptoms,
        collect(DISTINCT allTargetSymptoms.name) AS targetSymptoms
      
      // Get all symptoms of the similar disease
      MATCH (otherDisease)-[:HAS_SYMPTOM]->(allOtherSymptoms:Symptom)
      WITH
        targetDisease,
        otherDisease,
        sharedSymptoms,
        targetSymptoms,
        collect(DISTINCT allOtherSymptoms.name) AS otherSymptoms
      
      // Calculate Jaccard similarity: |intersection| / |union|
      WITH
        otherDisease,
        sharedSymptoms,
        targetSymptoms,
        otherSymptoms,
        size(sharedSymptoms) AS intersectionSize,
        size(targetSymptoms) + size(otherSymptoms) - size(sharedSymptoms) AS unionSize
      
      // Get species affected by the similar disease
      OPTIONAL MATCH (species:Species)-[:HAS_DISEASE]->(otherDisease)
      
      RETURN
        otherDisease.name AS diseaseName,
        otherDisease.description AS description,
        sharedSymptoms,
        otherSymptoms AS allSymptoms,
        collect(DISTINCT species.name) AS affectedSpecies,
        intersectionSize,
        unionSize,
        toFloat(intersectionSize) / unionSize AS similarityScore
      
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
