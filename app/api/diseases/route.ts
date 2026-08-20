import { NextResponse } from "next/server";
import { driver } from "@/lib/cognodb";

export async function GET() {
  const session = driver.session();

  try {
    const result = await session.run(`
      MATCH (d:Disease)
      OPTIONAL MATCH (d)-[:HAS_SYMPTOM]->(s:Symptom)
      RETURN
        d.name AS name,
        d.description AS description,
        collect(s.name) AS symptoms
      ORDER BY d.name
    `);

    const diseases = result.records.map((record) => ({
      name: record.get("name"),
      description: record.get("description"),
      symptoms: record.get("symptoms"),
    }));

    return NextResponse.json({
      success: true,
      data: diseases,
    });
  } catch (error) {
    console.error("Failed to fetch diseases:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch diseases",
      },
      { status: 500 }
    );
  } finally {
    await session.close();
  }
}