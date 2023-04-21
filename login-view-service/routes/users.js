import { Router } from "express";
const router = Router();

router.get("/signup", function (req, res, next) {
  if (req.query.fail)
    res.render("signup", {
      title: "Sign Up",
      message: "User registration failed!",
    });
  else res.render("signup", { title: "Sign Up", message: null });
});

router.get("/forgot", function (req, res, next) {
  res.render("forgot", { title: "Forgot my password" });
});

export default router;
