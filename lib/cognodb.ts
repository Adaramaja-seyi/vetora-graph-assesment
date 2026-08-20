import dotenv from "dotenv";
import neo4j from "neo4j-driver";

dotenv.config({ path: ".env.local" });

const uri = process.env.COGNODB_URI!;
const username = process.env.COGNODB_USERNAME!;
const password = process.env.COGNODB_PASSWORD!;

export const driver = neo4j.driver(
  uri,
  neo4j.auth.basic(username, password)
);