// drizzle.config.ts
export default {
  schema: "./src/db/schema.js",
  out: "./drizzle/migrations",
  dialect: "postgresql",
  dbCredentials: {
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.NODE_ENV === "production",
  },
  // Opzionale: tabelle da includere/escludere
  excludes: ["node_modules"],
  // Opzionale: stringhe custom per i nomi delle migrazioni
  verbose: true,
  strict: true,
};
