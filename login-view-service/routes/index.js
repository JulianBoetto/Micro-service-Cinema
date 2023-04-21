import { Router } from "express";
import authController from "../controllers/authController.js";
const router = Router();

router.get("/:pagina?", authController.validateToken, (req, res, next) => {
  res.render("index", {
    title: "title",
    docs: [],
    qtd: 2,
    qtdPaginas: 4,
    profile: "req.user.profile",
  });
});

export default router;
