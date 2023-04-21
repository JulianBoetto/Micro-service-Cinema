import { Router } from "express";
import authController from "../controllers/authController.js";
const router = Router();

/* GET home page. */
router.get("/", (req, res, next) => {
  res.render("login", { title: "Login", errorMessage: null });
});

router.get("/login", function (req, res) {
  if (req.cookies.token) return res.redirect("index");
  res.render("login", {
    title: "Login",
    message: null,
    error: false,
    errorMessage: null,
  });
});

router.post("/login", authController.authenticate);

router.post("/logoff", (req, res, next) => {
  res.clearCookie("token");
  res.redirect("/login");
});

export default router;
