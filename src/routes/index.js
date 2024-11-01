// import { UserRepository } from "../repositories/UserRepository";

export default async function (fastify, opts) {
  fastify.get("/", async (request, reply) => {
    return { hello: "asd" };
  });

  fastify.get("/db-test", async (request, reply) => {
    const client = await fastify.pg.connect();
    try {
      const { rows } = await client.query("SELECT NOW()");
      return { time: rows[0].now };
    } finally {
      client.release();
    }
  });

  fastify.get("/users", async (request, reply) => {
    const { rows } = await fastify.pg.query("SELECT * FROM users");
    return { users: rows };
  });

  // fastify.get("/users", async (request, reply) => {
  //   const userRepo = new UserRepository(fastify.db);
  //   const user = await userRepo.findAll();
  //   user.name; // completamente tipizzato
  //   return { users };
  // });
}
