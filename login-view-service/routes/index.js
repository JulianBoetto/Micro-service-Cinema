import { Router } from "express";
import authController from "../controllers/authController.js";
import moviesController from "../controllers/moviesController.js";
const router = Router();

router.get(
  "/",
  authController.validateToken,
  async (req, res, next) => {
    const token = req.cookies.token;
    const movies = await moviesController.getMovies(token);
    console.log(movies[0])
    res.render("index", {
      title: "title",
      docs: [],
      qtd: 2,
      qtdPaginas: 4,
      profile: "req.user.profile",
      data: movies,
    });
  }
);

export default router;
