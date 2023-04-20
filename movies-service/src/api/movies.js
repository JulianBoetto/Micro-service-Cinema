import {
  validateMovie,
  validateToken,
  validateAdmin
} from "../middlewares/validateMiddleware.js";
import logger from "../config/logger.js";

export default (app, repository) => {
  app.get("/movies/premieres", validateToken, async (req, res, next) => {
    const movies = await repository.getMoviePremieres();
    res.json(movies);
  });

  app.get("/movies", validateToken, async (req, res, next) => {
    const movies = await repository.getAllMovies();
    res.json(movies);
  });

  app.get("/movies/:id", validateToken, async (req, res, next) => {
    const movie = await repository.getMovieById(req.params.id);
    if (!movie) return res.sendStatus(404);

    res.json(movie);
  });

  app.post(
    "/movies",
    validateToken,
    validateAdmin,
    validateMovie,
    async (req, res, next) => {
      const title = req.body.title;
      const synopsis = req.body.synopsis;
      const duration = parseInt(req.body.duration);
      const releaseDate = new Date(req.body.releaseDate);
      const image = req.body.image;
      const categories = req.body.categories;

      const result = await repository.addMovie({
        title,
        synopsis,
        duration,
        releaseDate,
        image,
        categories,
      });

      logger.info(
        `User ${res.locals.userId} added the movie ${
          result._id
        } at ${new Date()}`
      );
      res.status(201).json(result);
    }
  );

  app.delete(
    "/movies/:id",
    validateToken,
    validateAdmin,
    async (req, res, next) => {
      const id = req.params.id;
      await repository.deleteMovie(id);

      logger.info(
        `User ${res.locals.userId} deleted the movie ${id} at ${new Date()}`
      );
      res.sendStatus(204);
    }
  );
};
