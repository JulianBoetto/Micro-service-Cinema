import database from "../config/db.js";
import bcryptjs from "bcryptjs";

async function getUser(email, password) {
  const db = await database.connect();
  const user = await db.collection("users").findOne({ email });

  if (!user) throw new Error("Wrong user and/or password!");

  const isValid = bcryptjs.compareSync(password, user.password);
  if (!isValid) throw new Error("Wrong user and/or password!");

  return user;
}

async function blocklistToken(token) {
  const db = await database.connect();
  return db.collection("blocklist").insertOne({ _id: token, data: new Date() });
}

async function checkBlocklist(token) {
  const db = await database.connect();
  const qtd = await db.collection("blocklist").countDocuments({ _id: token });
  return qtd > 0;
}

export default { getUser, blocklistToken, checkBlocklist };
