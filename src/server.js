import fastify from "fastify";
import postgres from "@fastify/postgres";
const app = fastify({
  logger: true,
});

// Register PostgreSQL plugin
app.register(postgres, {
  connectionString: process.env.DATABASE_URL,
});

app.register(import("./routes/index.js"));

const start = async () => {
  try {
    await app.listen({
      port: process.env.PORT || 3000,
      host: "0.0.0.0",
    });
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();
