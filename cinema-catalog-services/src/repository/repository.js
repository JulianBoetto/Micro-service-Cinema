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

async function getMoviesByCinemaId(cinemaId) {
    const objCinemaId = new ObjectId(cinemaId);
    const db = await database.connect();
    const group = await db.collection('cinema-catalog').aggregate([
        { $match: { "cinemas._id": objCinemaId } },
        { $unwind: "$cinemas" },
        { $unwind: "$cinemas.salas" },
        { $unwind: "$cinemas.salas.sessoes" },
        { $group: { _id: { titulo: "$cinemas.salas.sessoes.filme", _id: "$cinemas.salas.sessoes.idFilme" } } }
    ]).toArray();

    return group.map(g => g._id);
}

async function getMoviesByCityId(cityId) {
    const objCityId = new ObjectId(cityId);
    const db = await database.connect();
    const group = await db.collection('cinema-catalog').aggregate([
        { $match: { "_id": objCityId } },
        { $unwind: "$cinemas" },
        { $unwind: "$cinemas.salas" },
        { $unwind: "$cinemas.salas.sessoes" },
        { $group: { _id: { titulo: "$cinemas.salas.sessoes.filme", _id: "$cinemas.salas.sessoes.idFilme" } } }
    ]).toArray();

    return group.map(g => g._id);
}

export default {
  getAllCities,
  getCinemasByCityId,
  getMoviesByCinemaId,
  getMoviesByCityId
};
