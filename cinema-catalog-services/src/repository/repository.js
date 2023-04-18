import database from "../config/db.js";
import { ObjectId } from "mongodb";

async function getAllCities() {
  const db = await database.connect();
  return db
    .collection("cinema-catalog")
    .find({})
    .project({ cidade: 1, uf: 1, pais: 1 })
    .toArray();
}

async function getCinemasByCityId(cityId) {
    const objCityId = new ObjectId(cityId);
    const db = await database.connect();
    const city = await db.collection('cinema-catalog')
        .findOne({ _id: objCityId }, { projection: { cinemas: 1 } });

    return city.cinemas;
}

export default {
  getAllCities,
  getCinemasByCityId,
};
