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

    const result = await session.run(
      `
      MATCH (d:Disease {name: $diseaseName})

      OPTIONAL MATCH (animal:Species)-[:HAS_DISEASE]->(d)

      OPTIONAL MATCH (d)-[:HAS_SYMPTOM]->(symptom:Symptom)

      RETURN
        d.name AS name,
        d.description AS description,
        collect(DISTINCT animal.name) AS species,
        collect(DISTINCT symptom.name) AS symptoms
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

    return NextResponse.json({
      success: true,
      data: {
        name: record.get("name"),
        description: record.get("description"),
        species: record.get("species"),
        symptoms: record.get("symptoms"),
      },
    });
  } catch (error) {
    console.error("Disease API error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch disease",
      },
      { status: 500 }
    );
  } finally {
    await session.close();
  }
}