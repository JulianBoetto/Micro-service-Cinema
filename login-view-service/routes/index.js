import { Router } from "express";
import authController from "../controllers/authController.js";
const router = Router();
const movies = [
  {
    id: 1,
    col1: "random",
    col2: "data",
    col3: "placeholder",
    col4: "text",
  },
  {
    id: 2,
    col1: "placeholder",
    col2: "irrelevant",
    col3: "visual",
    col4: "layout",
  },
];

router.get("/:pagina?", authController.validateToken, (req, res, next) => {
  res.render("index", {
    title: "title",
    docs: [],
    qtd: 2,
    qtdPaginas: 4,
    profile: "req.user.profile",
    data: movies
  });
});

export default router;
