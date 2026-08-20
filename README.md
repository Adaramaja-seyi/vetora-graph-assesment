# 🐾 Vetora Graph

### Graph-Powered Veterinary Knowledge Explorer

Vetora Graph is a full-stack veterinary knowledge exploration application built with **Next.js, TypeScript, and CognoDB**.

The application demonstrates how a graph database can model and traverse relationships between animal species, diseases, symptoms, treatments, and medications. Users can select an animal species and symptoms to discover matching conditions and explore the relationships within the veterinary knowledge graph.

> **Disclaimer:** Vetora Graph is an educational demonstration project. Its results are based on symptom matching against seeded knowledge-graph data and are not medical or veterinary diagnoses. Professional veterinary evaluation should always be sought for real animals.

---

## 🚀 Live Demo

**Live Application:**
`YOUR_VERCEL_URL`

**GitHub Repository:**
`YOUR_GITHUB_REPOSITORY_URL`

---

## 📋 Table of Contents

* [Overview](#-overview)
* [Why a Graph Database?](#-why-a-graph-database)
* [How It Works](#-how-it-works)
* [Data Model](#-data-model)
* [Features](#-features)
* [Technology Stack](#-technology-stack)
* [Getting Started](#-getting-started)
* [Cypher Queries](#-cypher-queries)
* [Architecture](#-architecture)
* [Screenshots](#-screenshots)
* [Project Structure](#-project-structure)
* [Deployment](#-deployment)
* [Limitations and Future Improvements](#-limitations-and-future-improvements)

---

## 🐾 Overview

Veterinary knowledge contains many interconnected relationships:

```text
Species
   ↓
Disease
   ↓
Symptoms
   ↓
Treatment
   ↓
Medication
```

For example:

```text
Dog
 ↓ HAS_DISEASE
Canine Parvovirus
 ↓ HAS_SYMPTOM
Vomiting
```

These connections are central to Vetora Graph, making a graph database a natural fit for the application.

---

## 🤔 Why a Graph Database?

The core problem in Vetora Graph is not simply storing diseases or symptoms. It is understanding the **relationships between them**.

A disease can affect multiple species, present with multiple symptoms, share symptoms with other diseases, and be associated with multiple treatments.

CognoDB allows these relationships to be represented directly as typed graph relationships.

### Graph vs Relational Model

| Aspect                           | Graph Database                  | Relational Database                             |
| -------------------------------- | ------------------------------- | ----------------------------------------------- |
| Species → Disease relationships  | Direct graph traversal          | Junction tables and joins                       |
| Disease → Symptom relationships  | Direct relationships            | Junction tables                                 |
| Shared symptoms between diseases | Natural graph traversal         | Multiple joins and aggregations                 |
| Multi-hop relationships          | Readable Cypher paths           | Multiple joins or recursive queries             |
| Relationship meaning             | Explicit typed edges            | Usually represented through foreign keys        |
| Extending the graph              | Add new node/relationship types | Often requires additional tables and migrations |

### Why This Matters

One of the application's main queries traverses:

```text
Species → Disease → Symptom
```

This allows the application to find diseases associated with a selected species and compare their symptoms with symptoms selected by the user.

Another query explores:

```text
Disease → Symptom ← Disease
```

This identifies diseases that share symptoms with another disease.

These relationship-oriented queries are a strong fit for graph databases because the relationships themselves are first-class parts of the data model.

---

## 🔗 How It Works

The main user flow is:

```text
Select Animal Species
        ↓
Select Symptoms
        ↓
Query CognoDB
        ↓
Traverse Species → Disease → Symptom
        ↓
Calculate Matching Symptoms
        ↓
Rank Conditions
        ↓
Explore Disease Relationships
```

Users can then inspect the connected knowledge graph for a selected disease.

---

## 📊 Data Model

Vetora Graph uses a graph model containing veterinary entities and typed relationships.

### Graph Schema

```text
                         ┌──────────────┐
                         │   Species    │
                         └──────┬───────┘
                                │
                          HAS_DISEASE
                                │
                                ▼
                         ┌──────────────┐
                         │   Disease    │
                         └───┬──────┬───┘
                             │      │
                      HAS_SYMPTOM   │ TREATED_WITH
                             │      │
                             ▼      ▼
                        ┌────────┐ ┌───────────┐
                        │ Symptom│ │ Treatment │
                        └────────┘ └─────┬─────┘
                                         │
                                  USES_MEDICATION
                                         │
                                         ▼
                                   ┌────────────┐
                                   │ Medication │
                                   └────────────┘
```

### Node Types

#### Species

```cypher
(:Species {
  name: String
})
```

Examples:

* Dog
* Cat
* Horse
* Cow
* Goat

#### Disease

```cypher
(:Disease {
  name: String,
  description: String
})
```

Examples:

* Canine Parvovirus
* Rabies
* Gastroenteritis
* Ringworm
* Kennel Cough

#### Symptom

```cypher
(:Symptom {
  name: String
})
```

Examples:

* Vomiting
* Diarrhea
* Fever
* Coughing
* Lethargy
* Loss of appetite

#### Treatment

```cypher
(:Treatment {
  name: String,
  description: String
})
```

#### Medication

```cypher
(:Medication {
  name: String
})
```

### Relationship Types

#### `HAS_DISEASE`

```cypher
(:Species)-[:HAS_DISEASE]->(:Disease)
```

Represents a disease that can affect a particular species.

Example:

```cypher
(:Species {name: "Dog"})
-[:HAS_DISEASE]->
(:Disease {name: "Canine Parvovirus"})
```

#### `HAS_SYMPTOM`

```cypher
(:Disease)-[:HAS_SYMPTOM]->(:Symptom)
```

Represents a symptom associated with a disease.

Example:

```cypher
(:Disease {name: "Canine Parvovirus"})
-[:HAS_SYMPTOM]->
(:Symptom {name: "Vomiting"})
```

#### `TREATED_WITH`

```cypher
(:Disease)-[:TREATED_WITH]->(:Treatment)
```

Connects a disease to a treatment.

#### `USES_MEDICATION`

```cypher
(:Treatment)-[:USES_MEDICATION]->(:Medication)
```

Connects a treatment to an associated medication.

### Example Multi-Hop Path

```cypher
(:Species {name: "Dog"})
-[:HAS_DISEASE]->
(:Disease {name: "Canine Parvovirus"})
-[:HAS_SYMPTOM]->
(:Symptom {name: "Vomiting"})
```

This represents:

> Dogs can be affected by Canine Parvovirus, which can present with vomiting.

---

## ✨ Features

### User Features

* 🔍 Symptom-based condition matching
* 🐕 Species selection
* 📊 Ranked results based on symptom overlap
* 📈 Symptom match visualization
* 🔗 Disease similarity analysis
* 🌐 Interactive knowledge graph visualization
* 💊 Treatment and medication relationships
* 📱 Responsive interface
* ⚠️ Clear veterinary safety disclaimer
* ⏳ Loading states
* 🚫 Empty states
* ❌ Database error handling

### Engineering Features

* Official Neo4j JavaScript driver
* CognoDB accessed through Bolt
* Parameterized Cypher queries
* Multi-hop graph traversal
* Graph-based disease similarity
* TypeScript across the application
* Server-side database access
* Environment-based database credentials
* Structured API routes
* Graceful database error handling

---

## 🛠️ Technology Stack

| Layer             | Technology              | Purpose                          |
| ----------------- | ----------------------- | -------------------------------- |
| Frontend          | React                   | User interface                   |
| Framework         | Next.js                 | Full-stack application framework |
| Language          | TypeScript              | Type-safe development            |
| Styling           | Tailwind CSS            | UI styling                       |
| Database          | CognoDB                 | Managed graph database           |
| Database Protocol | Bolt                    | Database communication           |
| Driver            | Neo4j JavaScript Driver | CognoDB connection               |
| Visualization     | React Flow              | Interactive graph visualization  |
| Runtime           | Node.js                 | JavaScript runtime               |
| Deployment        | Vercel                  | Application hosting              |

---

# 🚀 Getting Started

## Prerequisites

Make sure you have:

* Node.js 20+
* npm
* A CognoDB Cloud account
* A CognoDB free `c0` instance

---

## 1. Create a CognoDB Instance

Create a free CognoDB instance from the CognoDB Cloud console:

https://console.cognodb.com/signup

Steps:

1. Create a CognoDB account.
2. Create a free `c0` instance.
3. Select a region.
4. Copy the generated database credentials.
5. Store the password securely.

The connection URI has the following format:

```text
bolt+s://<instance-id>.databases.cognodb.cloud
```

The database username is:

```text
cognodb
```

> **Important:** The CognoDB password is shown once. Save it securely when the instance is created.

---

## 2. Clone the Repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL

cd vetora-graph
```

---

## 3. Install Dependencies

```bash
npm install
```

---

## 4. Configure Environment Variables

Create a `.env.local` file in the project root:

```env
COGNODB_URI=bolt+s://your-instance-id.databases.cognodb.cloud
COGNODB_USERNAME=cognodb
COGNODB_PASSWORD=your-password
```

An example environment file is provided:

```text
.env.example
```

### Security

Never commit `.env.local` or database credentials to GitHub.

The application reads all CognoDB connection details from environment variables.

---

## 5. Seed the Database

Run:

```bash
npm run seed
```

The seed script creates the veterinary knowledge graph and establishes the relationships between nodes.

The dataset contains realistic sample veterinary entities including species, diseases, symptoms, treatments, and medications.

---

## 6. Start the Development Server

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

---

## 7. Test the Application

A typical workflow is:

1. Select an animal species.
2. Select one or more symptoms.
3. Submit the search.
4. Review ranked matching conditions.
5. Open a disease.
6. Explore its symptoms, affected species, treatments, and medications.
7. Explore the interactive knowledge graph.
8. Compare related diseases based on shared symptoms.

---

# 🔍 Cypher Queries

Vetora Graph uses parameterized Cypher queries through the official Neo4j JavaScript driver.

No user input is directly concatenated into Cypher statements.

---

## Query 1 — Symptom-Based Condition Matching

This is the application's primary multi-hop traversal.

```cypher
MATCH (animal:Species {name: $species})
      -[:HAS_DISEASE]->
      (d:Disease)
      -[:HAS_SYMPTOM]->
      (symptom:Symptom)

WHERE symptom.name IN $symptoms

WITH
  d,
  collect(DISTINCT symptom.name) AS matchedSymptoms

RETURN
  d.name AS disease,
  d.description AS description,
  matchedSymptoms,
  size(matchedSymptoms) AS matchedCount

ORDER BY matchedCount DESC
```

### Traversal

The query follows:

```text
Species
   ↓
Disease
   ↓
Symptom
```

This is a two-hop traversal.

The user's selected symptoms are passed as the `$symptoms` parameter, and diseases are ranked according to the number of matching symptoms.

### Why This Fits a Graph Database

The query directly expresses the domain relationships:

```text
Species → Disease → Symptom
```

In a relational model, the equivalent design would normally involve multiple tables and junction tables between species, diseases, and symptoms.

---

## Query 2 — Disease Details

The disease details query retrieves the disease together with connected species and symptoms.

```cypher
MATCH (d:Disease {name: $diseaseName})

OPTIONAL MATCH (animal:Species)-[:HAS_DISEASE]->(d)

OPTIONAL MATCH (d)-[:HAS_SYMPTOM]->(symptom:Symptom)

RETURN
  d.name AS name,
  d.description AS description,
  collect(DISTINCT animal.name) AS species,
  collect(DISTINCT symptom.name) AS symptoms
```

This query demonstrates traversal in both directions from a disease node.

---

## Query 3 — Knowledge Graph Visualization

The graph visualization query retrieves a disease and its neighboring nodes and relationships.

```cypher
MATCH (d:Disease {name: $diseaseName})

OPTIONAL MATCH (animal:Species)-[speciesRelationship:HAS_DISEASE]->(d)

OPTIONAL MATCH (d)-[symptomRelationship:HAS_SYMPTOM]->(symptom:Symptom)

RETURN
  d,
  collect(DISTINCT {
    node: animal,
    relationship: speciesRelationship
  }) AS speciesConnections,
  collect(DISTINCT {
    node: symptom,
    relationship: symptomRelationship
  }) AS symptomConnections
```

The API transforms this graph data into nodes and edges consumed by React Flow.

---

## Query 4 — Disease Similarity

Vetora Graph also compares diseases based on their shared symptoms.

The underlying graph pattern is:

```text
Disease A
    ↓
 Symptom
    ↑
Disease B
```

This allows the application to identify diseases that share clinical signs.

The similarity score is calculated using the Jaccard similarity coefficient:

```text
similarity = intersection / union
```

Where:

* **Intersection** = symptoms shared by both diseases
* **Union** = all unique symptoms belonging to either disease

A score closer to `1` indicates greater symptom similarity.

This demonstrates a relationship-oriented query that would require substantially more joins and set operations in a relational schema.

---

# 🏗️ Architecture

The application follows a simple full-stack architecture:

```text
┌──────────────────────────┐
│        Browser           │
│                          │
│  React / Next.js UI      │
└────────────┬─────────────┘
             │
             │ HTTP
             ▼
┌──────────────────────────┐
│       Next.js API        │
│                          │
│  API Routes              │
│  Query Layer             │
└────────────┬─────────────┘
             │
             │ Neo4j Driver
             │ Bolt Protocol
             ▼
┌──────────────────────────┐
│        CognoDB           │
│                          │
│   Veterinary Graph       │
└──────────────────────────┘
```

The database credentials are only accessed server-side through environment variables.

---

# 📸 Screenshots

## Home / Diagnosis Interface

![Vetora Graph Home](./docs/screenshot-home.png)

The main interface allows users to select an animal species and symptoms.

---

## Condition Results

![Condition Results](./docs/screenshot-results.png)

Matching conditions are ranked according to symptom overlap.

---

## Disease Details

![Disease Details](./docs/screenshot-disease-detail.png)

The disease details page displays connected species, symptoms, treatments, and other available relationships.

---

## Interactive Knowledge Graph

![Knowledge Graph](./docs/screenshot-graph.png)

The interactive graph provides a visual representation of the relationships stored in CognoDB.

---

# 📁 Project Structure

```text
vetora-graph/
│
├── app/
│   ├── api/
│   │   ├── diagnose/
│   │   │   └── route.ts
│   │   ├── diseases/
│   │   │   ├── route.ts
│   │   │   └── [diseaseName]/
│   │   │       ├── route.ts
│   │   │       └── similar/
│   │   │           └── route.ts
│   │   └── graph/
│   │       └── disease/
│   │           └── [diseaseName]/
│   │               └── route.ts
│   │
│   ├── diseases/
│   │   └── [diseaseName]/
│   │       └── page.tsx
│   │
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
│
├── components/
│   ├── DiagnosisForm.tsx
│   ├── DiseaseCard.tsx
│   ├── DiseaseDetail.tsx
│   ├── KnowledgeGraph.tsx
│   └── ...
│
├── lib/
│   ├── cognodb.ts
│   └── queries.ts
│
├── scripts/
│   └── seed.ts
│
├── docs/
│   ├── screenshot-home.png
│   ├── screenshot-results.png
│   ├── screenshot-disease-detail.png
│   └── screenshot-graph.png
│
├── .env.example
├── .gitignore
├── package.json
├── README.md
└── tsconfig.json
```

> The exact structure may vary slightly depending on the final implementation.

---

# 🚀 Deployment

The application can be deployed using Vercel.

## 1. Push the Repository to GitHub

```bash
git add .
git commit -m "Complete CognoDB assessment"
git push origin main
```

## 2. Import the Repository into Vercel

Create a new project in Vercel and connect the GitHub repository.

Vercel automatically detects the Next.js project.

## 3. Add Environment Variables

Add the following variables to the Vercel project:

```text
COGNODB_URI
COGNODB_USERNAME
COGNODB_PASSWORD
```

Use the same CognoDB credentials used during local development.

## 4. Deploy

After deployment, verify that:

* The homepage loads.
* The API routes can connect to CognoDB.
* The graph data is available.
* Disease searches work.
* The interactive graph renders correctly.
* Database errors are handled gracefully.

---

# ⚠️ Limitations and Future Improvements

Vetora Graph is intentionally a small demonstration application designed to show graph data modeling and traversal.

Potential future improvements include:

* More comprehensive veterinary datasets
* Additional animal species and breeds
* Treatment protocols
* Drug interactions and contraindications
* Diagnostic tests
* Geographic disease patterns
* Veterinary professional accounts
* More advanced graph-based recommendation algorithms
* Integration with verified veterinary medical sources
* AI-assisted natural-language search

The current system should not be used to make real veterinary treatment decisions.

---

---

## Built With

* [Next.js](https://nextjs.org/)
* [TypeScript](https://www.typescriptlang.org/)
* [CognoDB](https://console.cognodb.com/)
* [Neo4j JavaScript Driver](https://neo4j.com/docs/javascript-manual/current/)
* [React Flow](https://reactflow.dev/)
* [Vercel](https://vercel.com/)

---

**Built for the Wexa AI CognoDB Technical Assessment.** 🐾
