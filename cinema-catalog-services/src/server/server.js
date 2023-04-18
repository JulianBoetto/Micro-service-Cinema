import "express-async-errors";
import express from "express";
import morgan from "morgan";
let server = null;
const MS_NAME = process.env.MS_NAME;

async function start(api, repository) {
  const app = express();
  app.use(morgan("dev"));

  app.get("/health", (req, res, next) => {
    res.send(
      `The service ${MS_NAME} is running at ${process.env.PORT}`
    );
  });

  api(app, repository);

  app.use((error, req, res, next) => {
    console.error(error.stack);
    res.sendStatus(500);
  });

  server = app.listen(process.env.PORT, () => {
    console.log(
      `The service ${process.env.MS_NAME} already started at ${process.env.PORT}`
    );
  });

  return server;
}

async function stop() {
  if (server) await server.close();
  return true;
}

export default { start, stop };
