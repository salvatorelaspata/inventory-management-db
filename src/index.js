const fastify = require("fastify");
const app = fastify();

app.register(require("@fastify/postgres"), {
  connectionString: "postgres://postgres@0.0.0.0/postgres",
});

app.get("/", async () => ({ hello: "asdasdasdas" }));

app.get("/user/:id", (req, reply) => {
  app.pg.query(
    "SELECT id, username, hash, salt FROM users WHERE id=$1",
    [req.params.id],
    function onResult(err, result) {
      reply.send(err || result);
    }
  );
});

app.listen({ port: 3000, host: "0.0.0.0" }, (err) => {
  if (err) throw err;
  console.log(`server listening on ${app.server.address().port}`);
});
