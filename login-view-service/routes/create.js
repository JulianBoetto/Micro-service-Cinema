import { Router } from "express";
import authController from "../controllers/authController.js";
import moviesController from "../controllers/moviesController.js";
const router = Router();

router.get("/", authController.validateToken, (req, res, next) => {
  return moviesController.renderCreateMovie(req, res, next);
});

export default router;
