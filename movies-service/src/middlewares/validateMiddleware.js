import movieSchema from "../schemas/movieSchema.js";
import jwt from "jsonwebtoken";

const ADMIN_PROFILE = 1;

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
  let token = req.headers["authorization"];
  if (!token) return res.sendStatus(401);

  token = token.replace("Bearer ", "");

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

function validateAdmin(req, res, next) {
  const { profileId } = res.locals;
  if (profileId == ADMIN_PROFILE) next();
  else res.sendStatus(403);
}

export { validateMovie, validateToken, validateAdmin };
