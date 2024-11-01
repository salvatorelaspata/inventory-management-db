const fastify = require("fastify")({ logger: true });

// Register PostgreSQL plugin
fastify.register(require("@fastify/postgres"), {
  connectionString: process.env.DATABASE_URL,
});

// Register routes
fastify.register(require("./routes"));

const start = async () => {
  try {
    await fastify.listen({
      port: process.env.PORT || 3000,
      host: "0.0.0.0",
    });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
