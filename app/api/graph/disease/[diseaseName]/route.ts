
import { NextResponse } from "next/server";
import { driver } from "@/lib/cognodb";

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
      //query the database for the disease and its relationships with species
      // collect(DISTINCT : This tells CognoDB:Give me each node/relationship only once.
const result = await session.run(
  `
  MATCH (d:Disease {name: $diseaseName})

  OPTIONAL MATCH (animal:Species)-[speciesRelationship:HAS_DISEASE]->(d)

  WITH d,
       collect(DISTINCT {
         node: animal,
         relationship: speciesRelationship
       }) AS speciesConnections

  OPTIONAL MATCH (d)-[symptomRelationship:HAS_SYMPTOM]->(symptom:Symptom)

  RETURN
    d,
    speciesConnections,
    collect(DISTINCT {
      node: symptom,
      relationship: symptomRelationship
    }) AS symptomConnections
  `,
  {
    diseaseName,
  }
);

    if (result.records.length === 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Disease not found",
        },
        { status: 404 }
      );
    }

    const record = result.records[0];

    const diseaseNode = record.get("d");
    const speciesConnections = record.get("speciesConnections");
    const symptomConnections = record.get("symptomConnections");

    const nodes = [];
    const relationships = [];

    nodes.push({
      id: diseaseNode.elementId,
      label: diseaseNode.properties.name,
      type: "Disease",
    });

    for (const connection of speciesConnections) {
      if (!connection.node) continue;

      nodes.push({
        id: connection.node.elementId,
        label: connection.node.properties.name,
        type: "Species",
      });

      if (connection.relationship) {
        relationships.push({
          id: connection.relationship.elementId,
          source: connection.relationship.startNodeElementId,
          target: connection.relationship.endNodeElementId,
          type: connection.relationship.type,
        });
      }
    }

    for (const connection of symptomConnections) {
      if (!connection.node) continue;

      nodes.push({
        id: connection.node.elementId,
        label: connection.node.properties.name,
        type: "Symptom",
      });

      if (connection.relationship) {
        relationships.push({
          id: connection.relationship.elementId,
          source: connection.relationship.startNodeElementId,
          target: connection.relationship.endNodeElementId,
          type: connection.relationship.type,
        });
      }
    }

    return NextResponse.json({
      success: true,
      disease: diseaseName,
      nodes,
      relationships,
    });
  } catch (error) {
    console.error("Graph API error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch graph data",
      },
      { status: 500 }
    );
  } finally {
    await session.close();
  }
}