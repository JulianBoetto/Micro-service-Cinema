import movieSchema from "../schemas/movieSchema.js";
import jwt from 'jsonwebtoken';

function validateMovie(req, res, next) {
  const { error } = movieSchema.validate(req.body);
  console.log(error);
  if (error) {
    const { details } = error;
    return res.status(422).json(details.map((d) => d.message));
  }

  next();
}

function validateToken(req, res, next) {
  let token = req.headers['authorization'];
  if (!token) return res.sendStatus(401);

  token = token.replace('Bearer ', '');

  try {
      const { userId, profileId } = jwt.verify(token, process.env.SECRET);
      res.locals.userId = userId;
      res.locals.profileId = profileId;
      next();
  } catch (err) {
      console.log(err);
      res.sendStatus(401);
  }
}

export {
  validateMovie,
  validateToken
};
