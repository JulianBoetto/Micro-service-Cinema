import database from "../config/db.js";
import { ObjectId } from "mongodb";

async function getAllCities() {
  const db = await database.connect();
  return db
    .collection("cinema-catalog")
    .find({})
    .project({ city: 1, state: 1, country: 1 })
    .toArray();
}

async function getCinemasByCityId(cityId) {
  const objCityId = new ObjectId(cityId);
  const db = await database.connect();
  const city = await db
    .collection("cinema-catalog")
    .findOne({ _id: objCityId }, { projection: { movieTheaters: 1 } });

  return city.movieTheaters;
}

async function getMoviesByCinemaId(cinemaId) {
  const objCinemaId = new ObjectId(cinemaId);
  const db = await database.connect();
  const group = await db
    .collection("cinema-catalog")
    .aggregate([
      { $match: { "movieTheaters._id": objCinemaId } },
      { $unwind: "$movieTheaters" },
      { $unwind: "$movieTheaters.screens" },
      { $unwind: "$movieTheaters.screens.sessions" },
      {
        $group: {
          _id: {
            title: "$movieTheaters.screens.sessions.movie",
            _id: "$movieTheaters.screens.sessions.movieId",
          },
        },
      },
    ])
    .toArray();

  return group.map((g) => g._id);
}

async function getMoviesByCityId(cityId) {
  const objCityId = new ObjectId(cityId);
  const db = await database.connect();
  const group = await db
    .collection("cinema-catalog")
    .aggregate([
      { $match: { _id: objCityId } },
      { $unwind: "$movieTheaters" },
      { $unwind: "$movieTheaters.screens" },
      { $unwind: "$movieTheaters.screens.sessions" },
      {
        $group: {
          _id: {
            title: "$movieTheaters.screens.sessions.movie",
            _id: "$movieTheaters.screens.sessions.movieId",
          },
        },
      },
    ])
    .toArray();

  return group.map((g) => g._id);
}

async function getMovieSessionsByCityId(movieId, cityId) {
  const objCityId = new ObjectId(cityId);
  const objMovieId = new ObjectId(movieId);

  const db = await database.connect();
  const group = await db
    .collection("cinema-catalog")
    .aggregate([
      { $match: { _id: objCityId } },
      { $unwind: "$movieTheaters" },
      { $unwind: "$movieTheaters.screens" },
      { $unwind: "$movieTheaters.screens.sessions" },
      { $match: { "movieTheaters.screens.sessions.movieId": objMovieId } },
      {
        $group: {
          _id: {
            title: "$movieTheaters.screens.sessions.movie",
            _id: "$movieTheaters.screens.sessions.movieId",
            cinema: "$movieTheaters.name",
            idCinema: "$movieTheaters._id",
            screen: "$movieTheaters.screens.name",
            session: "$movieTheaters.screens.sessions",
          },
        },
      },
    ])
    .toArray();
  return group.map((g) => g._id);
}

async function getMovieSessionsByCinemaId(movieId, cinemaId) {
  const objCinemaId = new ObjectId(cinemaId);
  const objMovieId = new ObjectId(movieId);

  const db = await database.connect();
  const group = await db
    .collection("cinema-catalog")
    .aggregate([
      { $match: { "movieTheaters._id": objCinemaId } },
      { $unwind: "$movieTheaters" },
      { $unwind: "$movieTheaters.screens" },
      { $unwind: "$movieTheaters.screens.sessions" },
      { $match: { "movieTheaters.screens.sessions.movieId": objMovieId } },
      {
        $group: {
          _id: {
            title: "$movieTheaters.screens.sessions.movie",
            _id: "$movieTheaters.screens.sessions.movieId",
            cinema: "$movieTheaters.name",
            idCinema: "$movieTheaters._id",
            screen: "$movieTheaters.screens.name",
            session: "$movieTheaters.screens.sessions",
          },
        },
      },
    ])
    .toArray();
  return group.map((g) => g._id);
}

export default {
  getAllCities,
  getCinemasByCityId,
  getMoviesByCinemaId,
  getMoviesByCityId,
  getMovieSessionsByCityId,
  getMovieSessionsByCinemaId
};
