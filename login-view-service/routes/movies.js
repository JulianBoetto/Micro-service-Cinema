import { Router } from "express";
import authController from "../controllers/authController.js";
import moviesController from "../controllers/moviesController.js";
import { uploadFile } from "../middlewares/uploadFile.js";
const router = Router();

router.post("/", authController.validateToken, uploadFile, (req, res, next) => {
  delete req.body.access_token;
  return moviesController.createMovie(req, res, next);
});

router.get("/", authController.validateToken, (req, res, next) => {
  return res.render("dashboard/createdMovie", {
    title: 'Taasafa',
    synopsis: 'adsfafasdgasfasfasfa',
    duration: 141,
    releaseDate: '1511-12-15T00:00:00.000Z',
    image: 'uploads/image_1682443254298_Captura de pantalla de 2022-10-13 12-25-50.png',
    categories: [ 'Action' ],
    _id: '64480bf6033b1f6a00e5320c'
  })
});

export default router;
