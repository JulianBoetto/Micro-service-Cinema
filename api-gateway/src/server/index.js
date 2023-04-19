import express, { json } from "express";
import httpProxy from "express-http-proxy";
import cookieParser from "cookie-parser";
import authController from "../controllers/authController.js";
import morgan from "morgan";
import helmet from "helmet";
import optionsProxy from "../utils/optionsProxy.js";

const app = express();

app.use(morgan("dev"));
app.use(helmet());
app.use(cookieParser());
app.use(json());

app.post("/login", authController.validateLoginSchema, authController.doLogin);

app.use(authController.validateBlocklist);

app.delete("/logout", authController.validateToken, authController.doLogout);

const moviesServiceProxy = httpProxy(
  process.env.MOVIES_API,
  optionsProxy.proxyReqPathResolver
);
const catalogServiceProxy = httpProxy(
  process.env.CATALOG_API,
  optionsProxy.proxyReqPathResolver
);

app.use("/movies", authController.validateToken, moviesServiceProxy);

app.get(/cities|cinemas/i, authController.validateToken, catalogServiceProxy);

const server = app.listen(process.env.PORT, () => {
  console.log(`API Gateway started at ${process.env.PORT}`);
});

export default server;
