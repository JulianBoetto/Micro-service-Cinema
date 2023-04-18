import { test, expect } from "@jest/globals";
import repository from "./repository.js";

let cityId = null;
let cinemaId = null;
let movieId = null;

beforeAll(async () => {
    const cities = await repository.getAllCities();
    cityId = cities[cities.length - 1]._id;

    const cinemas = await repository.getCinemasByCityId(cityId);
    cinemaId = cinemas[0]._id;

    movieId = cinemas[0].salas[0].sessoes[0].idFilme;
})

test('getAllCities', async () => {
    const cities = await repository.getAllCities();
    expect(Array.isArray(cities)).toBeTruthy();
    expect(cities.length).toBeTruthy();
})

test('getCinemasByCityId', async () => {
    const cinemas = await repository.getCinemasByCityId(cityId);
    expect(Array.isArray(cinemas)).toBeTruthy();
})