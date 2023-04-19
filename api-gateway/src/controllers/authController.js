import jwt from "jsonwebtoken";
import repository from "../repository/repository.js";
import loginSchema from "../schemas/loginSchema.js";

async function doLogin(req, res, next) {
  const email = req.body.email;
  const password = req.body.password;

  try {
    const user = await repository.getUser(email, password);
    const token = jwt.sign(
      { userId: user._id, profileId: user.profileId },
      process.env.SECRET,
      { expiresIn: parseInt(process.env.EXPIRES) }
    );

    res.json({ token });
  } catch (err) {
    console.log(err);
    res.sendStatus(401);
  }
}

async function validateBlocklist(req, res, next) {
  let token = req.headers["authorization"];
  if (!token) return next();

  token = token.replace("Bearer ", "");
  const isBlocklisted = await repository.checkBlocklist(token);

  if (isBlocklisted) return res.sendStatus(401);
  else next();
}

async function validateLoginSchema(req, res, next) {
  const { error } = loginSchema.validate(req.body);
  if (error) {
    const { details } = error;
    return res.status(422).json(details.map((d) => d.message));
  }

  next();
}

async function validateToken(req, res, next) {
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

async function doLogout(req, res, next) {
  let token = req.headers["authorization"];
  token = token.replace("Bearer ", "");

  await repository.blocklistToken(token);
  res.sendStatus(200);
}

export default {
  doLogin,
  doLogout,
  validateToken,
  validateBlocklist,
  validateLoginSchema,
};
