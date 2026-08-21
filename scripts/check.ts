import { driver } from "../lib/cognodb";

async function checkDatabase() {
  const session = driver.session();

  try {
    console.log("Checking CognoDB...\n");

    // 1. Check species
    const speciesResult = await session.run(`
      MATCH (s:Species)
      RETURN s.name AS name
      ORDER BY s.name
    `);

    console.log("Species:");
    speciesResult.records.forEach((record) => {
      console.log(`- ${record.get("name")}`);
    });

    // 2. Check diseases
    const diseaseResult = await session.run(`
      MATCH (d:Disease)
      RETURN d.name AS name
      ORDER BY d.name
    `);

    console.log(" Diseases:");
    diseaseResult.records.forEach((record) => {
      console.log(`- ${record.get("name")}`);
    });

    // 3. Check Dog → Disease relationships
    const dogDiseases = await session.run(`
      MATCH (s:Species {name: "Dog"})-[:HAS_DISEASE]->(d:Disease)
      RETURN d.name AS disease
      ORDER BY d.name
    `);

    console.log("\n🐕 Diseases associated with Dogs:");
    dogDiseases.records.forEach((record) => {
      console.log(`- ${record.get("disease")}`);
    });

    // 4. Check Parvovirus → Symptoms relationships
    const parvoSymptoms = await session.run(`
      MATCH (d:Disease {name: "Parvovirus"})-[:HAS_SYMPTOM]->(s:Symptom)
      RETURN s.name AS symptom
      ORDER BY s.name
    `);

    console.log("Parvovirus symptoms:");
    parvoSymptoms.records.forEach((record) => {
      console.log(`- ${record.get("symptom")}`);
    });

    console.log(" Database check completed successfully!");
  } catch (error) {
    console.error(" Database check failed:", error);
  } finally {
    await session.close();
    await driver.close();
  }
}

checkDatabase();