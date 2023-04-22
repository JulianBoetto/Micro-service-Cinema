import { Router } from "express";
import authController from "../controllers/authController.js";
import moviesController from "../controllers/moviesController.js";
const router = Router();

router.get("/", authController.validateToken, moviesController.getMovies);

export default router;
