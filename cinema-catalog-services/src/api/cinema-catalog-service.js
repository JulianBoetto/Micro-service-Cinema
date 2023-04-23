import {
  validateToken,
  validateId,
} from "../middlewares/validateMiddleware.js";

export default (app, repository) => {
  app.get(
    "/cities/:cityId/movies/:movieId",
    validateToken,
    validateId,
    async (req, res, next) => {
      const sessions = await repository.getMovieSessionsByCityId(
        req.params.movieId,
        req.params.cityId
      );
      if (!sessions) return res.sendStatus(404);

      res.json(sessions);
    }
  );

  app.get(
    "/cities/:cityId/movies",
    validateToken,
    validateId,
    async (req, res, next) => {
      const movies = await repository.getMoviesByCityId(req.params.cityId);
      if (!movies) return res.sendStatus(404);

      res.json(movies);
    }
  );

  app.get(
    "/cities/:cityId/cinemas",
    validateToken,
    validateId,
    async (req, res, next) => {
      const movieTheaters = await repository.getCinemasByCityId(
        req.params.cityId
      );
      if (!movieTheaters) return res.sendStatus(404);

      res.json(movieTheaters);
    }
  );

  app.get("/cities", validateToken, async (req, res, next) => {
    const cities = await repository.getAllCities();
    res.json(cities);
  });

  app.get(
    "/cinemas/:cinemaId/movies/:movieId",
    validateToken,
    validateId,
    async (req, res, next) => {
      const sessions = await repository.getMovieSessionsByCinemaId(
        req.params.movieId,
        req.params.cinemaId
      );
      if (!sessions) return res.sendStatus(404);

      res.json(sessions);
    }
  );

  app.get(
    "/cinemas/:cinemaId/movies",
    validateToken,
    validateId,
    async (req, res, next) => {
      const movies = await repository.getMoviesByCinemaId(req.params.cinemaId);
      if (!movies) return res.sendStatus(404);

      res.json(movies);
    }
  );
};
