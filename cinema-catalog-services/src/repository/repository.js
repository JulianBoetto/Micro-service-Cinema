import database from "../config/db.js";
import { ObjectId } from "mongodb";

async function getAllCities() {
  const db = await database.connect();
  return db
    .collection("cinemaCatalog")
    .find({})
    .project({ cidade: 1, uf: 1, pais: 1 })
    .toArray();
}

export default {
  getAllCities
};
