import { Router } from "express";
import url from "url";
import authController from "../controllers/authController.js";
import moviesController from "../controllers/moviesController.js";
const router = Router();

router.get("/:?", authController.validateToken, (req, res) => {
  const queryObject = url.parse(req.url, true).query;

  if (Object.keys(queryObject).length === 0) {
    res.redirect("/index?city=all");
  } else {
    if (queryObject.city && queryObject.city === "all")
      return moviesController.getAllMovies(req, res);
  }
  return moviesController.getMoviesByCity(req, res);
});

export default router;
