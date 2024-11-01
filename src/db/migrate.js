import { drizzle } from "drizzle-orm/node-postgres";
import { migrate } from "drizzle-orm/node-postgres/migrator";
import pg from "pg";
import * as schema from "./schema.js";

const { Pool } = pg;

async function runMigrations() {
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
  });

  const db = drizzle(pool, { schema });

  console.log("Running migrations...");

  await migrate(db, {
    migrationsFolder: "./drizzle/migrations",
  });

  console.log("Migrations completed!");

  await pool.end();
}

runMigrations().catch(console.error);
