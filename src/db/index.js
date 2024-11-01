import { drizzle } from "drizzle-orm/neon-http";
import { Pool } from "pg";
import { drizzle as drizzlePg } from "drizzle-orm/node-postgres";
import * as mysql from "mysql2/promise";
import { drizzle as drizzleMySQL } from "drizzle-orm/mysql2";
import { neon } from "@neondatabase/serverless";
import { drizzle as drizzleD1 } from "drizzle-orm/d1";

export class Database {
  static instance;
  db;

  constructor() {}

  static async create(config) {
    if (!Database.instance) {
      Database.instance = new Database();
      await Database.instance.initialize(config);
    }
    return Database.instance;
  }

  async initialize(config) {
    switch (config.type) {
      case "postgres": {
        const pool = new Pool({
          connectionString: config.url,
        });
        this.db = drizzle(pool);
        break;
      }
      case "mysql": {
        const connection = await mysql.createConnection({
          uri: config.url,
        });
        this.db = drizzleMySQL(connection);
        break;
      }
      case "neon": {
        // Per Neon con connessione HTTP (edge-ready)
        const sql = neon(config.url);
        this.db = drizzle(sql);
        break;
      }

      case "cloudflare": {
        // Per Cloudflare D1
        const { d1Database } = config.config;
        this.db = drizzleD1(d1Database);
        break;
      }

      case "aws": {
        // Per AWS RDS/Aurora
        const pool = new Pool({
          connectionString: config.url,
          ssl: {
            rejectUnauthorized: true,
          },
        });
        this.db = drizzlePg(pool);
        break;
      }

      default:
        throw new Error("Database type not supported");
    }
  }

  get client() {
    return this.db;
  }
}
