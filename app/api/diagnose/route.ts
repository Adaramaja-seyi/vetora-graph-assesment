import { NextResponse } from "next/server";
import { driver } from "@/lib/cognodb";

export async function GET(request: Request) {
  const session = driver.session();

  try {
    const { searchParams } = new URL(request.url);

    const species = searchParams.get("species");
    const symptomsParam = searchParams.get("symptoms");

    if (!species || !symptomsParam) {
      return NextResponse.json(
        {
          success: false,
          message: "Species and symptoms are required",
        },
        { status: 400 }
      );
    }

    const symptoms = symptomsParam
      .split(",")
      .map((symptom) => symptom.trim())
      .filter(Boolean);

 const result = await session.run(
  `
  MATCH (animal:Species {name: $species})
        -[:HAS_DISEASE]->
        (d:Disease)
        -[:HAS_SYMPTOM]->
        (allSymptoms:Symptom)

  WITH
    d,
    collect(DISTINCT allSymptoms.name) AS allSymptoms

  UNWIND allSymptoms AS symptom

  WITH
    d,
    allSymptoms,
    collect(
      CASE
        WHEN symptom IN $symptoms THEN symptom
        ELSE null
      END
    ) AS matched

  WITH
    d,
    allSymptoms,
    [x IN matched WHERE x IS NOT NULL] AS matchedSymptoms

  RETURN
    d.name AS disease,
    d.description AS description,
    allSymptoms,
    matchedSymptoms,
    size(matchedSymptoms) AS matchedCount,
    size(allSymptoms) AS totalSymptoms

  ORDER BY matchedCount DESC
  `,
  {
    species,
    symptoms,
  }
);

  const diagnoses = result.records.map((record) => {
  const matchedCount = record.get("matchedCount").toNumber();
  const totalSymptoms = record.get("totalSymptoms").toNumber();

  const matchPercentage =
    symptoms.length > 0
      ? Math.round((matchedCount / symptoms.length) * 100)
      : 0;

  return {
    disease: record.get("disease"),
    description: record.get("description"),
    matchedSymptoms: matchedCount,
    totalSymptoms,
    matchPercentage,
    symptoms: record.get("allSymptoms"),
    matchingSymptoms: record.get("matchedSymptoms"),
  };
});

    return NextResponse.json({
      success: true,
      species,
      requestedSymptoms: symptoms,
      results: diagnoses,
    });
  } catch (error) {
    console.error("Diagnosis failed:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to perform diagnosis",
      },
      { status: 500 }
    );
  } finally {
    await session.close();
  }
}