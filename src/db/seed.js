import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "./schema";

async function seed() {
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
  });

  const db = drizzle(pool, { schema });

  // Inserisci dati di esempio
  console.log("Seeding database...");

  await db.insert(schema.users).values([
    {
      email: "user1@example.com",
      name: "User One",
      role: "admin",
    },
    {
      email: "user2@example.com",
      name: "User Two",
      role: "user",
    },
  ]);

  await db.insert(schema.posts).values([
    {
      title: "First Post",
      content: "This is the first post content",
      published: true,
      authorId: 1,
    },
  ]);

  console.log("Seeding completed!");

  await pool.end();
}

seed().catch(console.error);
