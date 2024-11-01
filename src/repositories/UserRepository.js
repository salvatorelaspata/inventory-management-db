import { eq } from "drizzle-orm";
import { users } from "../db/schema";

// import { InferModel } from 'drizzle-orm';

// Inferenza dei tipi dal schema
// type User = InferModel<typeof users>;
// type NewUser = InferModel<typeof users, 'insert'>;

export class UserRepository {
  db;

  constructor(db) {
    this.db = db;
  }

  async findAll() {
    return await this.db.client.select().from(users);
  }

  async findById(id) {
    return await this.db.client
      .select()
      .from(users)
      .where(eq(users.id, id))
      .limit(1);
  }

  async create(data) {
    return await this.db.client.insert(users).values(data).returning();
  }

  async update(id, data) {
    return await this.db.client
      .update(users)
      .set(data)
      .where(eq(users.id, id))
      .returning();
  }

  async delete(id) {
    return await this.db.client.delete(users).where(eq(users.id, id));
  }
}
