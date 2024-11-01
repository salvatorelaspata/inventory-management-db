module.exports = async function (fastify, opts) {
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
};
