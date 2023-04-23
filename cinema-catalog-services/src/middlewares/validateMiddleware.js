import jwt from "jsonwebtoken";
import logger from "../config/logger.js";

function validateToken(req, res, next) {
  let token = req.headers["authorization"];
  if (!token) return res.sendStatus(401);

  token = token.replace("Bearer ", "");

  try {
    const { userId } = jwt.verify(token, process.env.SECRET);
    res.locals.userId = userId;
    next();
  } catch (err) {
    console.log(err);
    res.sendStatus(401);
  }
}

function validateId(req, res, next) {
  const regex = /^[0-9a-fA-F]{24}$/;
  const ids = Object.values(req.params);

  console.log(ids)
  for (const id of ids) {
    if (!regex.test(id)) {
      logger.error(
        "Validate MongoDB: Argument passed in must be a string of 12 bytes or a string of 24 hex characters or an integer"
      );
      return res.send([]);
    }
  }
  next();
}

export { validateToken, validateId };
