import dotenv from "dotenv";

dotenv.config({ path: ".env.local" }); // load environment variables from .env.local file
import { driver } from "../lib/cognodb";

const species = [
  "Dog",
  "Cat",
  "Horse",
  "Cow",
  "Goat",
];

const diseases = [
  {
    name: "Parvovirus",
    description: "A highly contagious viral disease that mainly affects dogs.",
    species: ["Dog"],
    symptoms: ["Vomiting", "Diarrhea", "Fever", "Lethargy", "Loss of appetite"],
  },
  {
    name: "Rabies",
    description: "A fatal viral disease that affects the nervous system.",
    species: ["Dog", "Cat", "Horse", "Cow", "Goat"],
    symptoms: ["Fever", "Lethargy", "Loss of appetite"],
  },
  {
    name: "Gastroenteritis",
    description: "Inflammation of the stomach and intestines.",
    species: ["Dog", "Cat", "Horse", "Cow", "Goat"],
    symptoms: ["Vomiting", "Diarrhea", "Loss of appetite", "Lethargy"],
  },
  {
    name: "Ringworm",
    description: "A fungal infection affecting the skin and hair.",
    species: ["Dog", "Cat", "Horse", "Cow", "Goat"],
    symptoms: ["Lethargy"],
  },
  {
    name: "Kennel Cough",
    description: "A contagious respiratory infection commonly affecting dogs.",
    species: ["Dog"],
    symptoms: ["Coughing", "Fever", "Lethargy"],
  },
];

const symptoms = [
  "Vomiting",
  "Diarrhea",
  "Fever",
  "Coughing",
  "Lethargy",
  "Loss of appetite",
];

async function seed() {
  const session = driver.session();

  try {
    console.log("🌱 Starting database seed...");

    // Create species
    for (const name of species) {
      await session.run(
        `
        MERGE (s:Species {name: $name})
        `,
        { name }
      );
    }

    console.log("✅ Species created");

    // Create symptoms
    for (const name of symptoms) {
      await session.run(
        `
        MERGE (s:Symptom {name: $name})
        `,
        { name }
      );
    }

    console.log("✅ Symptoms created");

    // Create diseases and relationships
    for (const disease of diseases) {
      await session.run(
        `
        MERGE (d:Disease {name: $name})
        SET d.description = $description

        WITH d

        UNWIND $species AS speciesName
        MATCH (s:Species {name: speciesName})
        MERGE (s)-[:HAS_DISEASE]->(d)

        WITH d
        UNWIND $symptoms AS symptomName
        MATCH (symptom:Symptom {name: symptomName})
        MERGE (d)-[:HAS_SYMPTOM]->(symptom)
        `,
        {
          name: disease.name,
          description: disease.description,
          species: disease.species,
          symptoms: disease.symptoms,
        }
      );
    }

    console.log("✅ Diseases and relationships created");

    console.log("🎉 Database seeding completed successfully!");
  } catch (error) {
    console.error("❌ Seeding failed:", error);
    process.exit(1);
  } finally {
    await session.close();
    await driver.close();
  }
}

seed();