import { test, expect, beforeAll } from "@jest/globals";
import repository from "./repository.js";

let cityId = null;
let cinemaId = null;
let movieId = null;

beforeAll(async () => {
  const cities = await repository.getAllCities();
  cityId = cities[cities.length - 1]._id;

  const movieTheaters = await repository.getCinemasByCityId(cityId);
  cinemaId = movieTheaters[0]._id;

  movieId = movieTheaters[0].screens[0].sessions[0].movieId;
});

test("getAllCities", async () => {
  const cities = await repository.getAllCities();
  expect(Array.isArray(cities)).toBeTruthy();
  expect(cities.length).toBeTruthy();
});

test("getCinemasByCityId", async () => {
  const movieTheaters = await repository.getCinemasByCityId(cityId);
  expect(Array.isArray(movieTheaters)).toBeTruthy();
});

test("getMoviesByCinemaId", async () => {
  const movies = await repository.getMoviesByCinemaId(cinemaId);
  expect(Array.isArray(movies)).toBeTruthy();
  expect(movies.length).toBeTruthy();
});

test("getMoviesByCityId", async () => {
  const movies = await repository.getMoviesByCityId(cityId);
  expect(Array.isArray(movies)).toBeTruthy();
  expect(movies.length).toBeTruthy();
});

test("getMovieSessionsByCityId", async () => {
  const movieSessions = await repository.getMovieSessionsByCityId(
    movieId,
    cityId
  );
  expect(Array.isArray(movieSessions)).toBeTruthy();
  expect(movieSessions.length).toBeTruthy();
});

test("getMovieSessionsByCinemaId", async () => {
  const movieSessions = await repository.getMovieSessionsByCinemaId(
    movieId,
    cinemaId
  );
  expect(Array.isArray(movieSessions)).toBeTruthy();
  expect(movieSessions.length).toBeTruthy();
});
