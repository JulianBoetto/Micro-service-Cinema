import movieSchema from "../schemas/movieSchema.js";

function validateMovie(req, res, next) {
  const { error } = movieSchema(req.body);
  console.log(error);
  if (error) {
    const { details } = error;
    return res.status(422).json(details.map((d) => d.message));
  }

  next();
}

export default {
  validateMovie,
};
