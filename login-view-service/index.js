import express from "express";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import helmet from "helmet";
import loginRouter from "./routes/login.js";
import createError from "http-errors";

const app = express();

app.use(morgan("dev"));
app.use(helmet());
app.use(cookieParser());
app.use(express.static("./public"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.set("views", "./views");
app.set("view engine", "ejs");



app.use("/", loginRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

const server = app.listen(process.env.PORT, () => {
  console.log(`Login view started at ${process.env.PORT}`);
});

export default server;
