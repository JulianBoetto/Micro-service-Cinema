import { test, expect } from "@jest/globals";
import repository from "./repository.js";

let testMovieId = null;

beforeAll(async () => {
    const movies = await repository.getAllMovies();
    testMovieId = movies[0]._id;
})

test("Find all Movies", async () => {
    const movies = await repository.getAllMovies();
    expect(Array.isArray(movies)).toBeTruthy();
    expect(movies.length).toBeTruthy();
});

test("Find Movie by ID", async () => {
    const movie = await repository.getMovieById(testMovieId);
    expect(movie).toBeTruthy();
    expect(movie._id).toEqual(testMovieId);
});

test("Find Movies premieres", async () => {
    const monthAgo = new Date();
    monthAgo.setMonth(- 1);

    const movies = await repository.getMoviePremieres();
    expect(Array.isArray(movies)).toBeTruthy();
    expect(movies.length).toBeTruthy();
    expect(movies[0].dataLancamento.getTime()).toBeGreaterThanOrEqual(monthAgo.getTime());
});

test("Disconnection Repository", async () => {
    const isDisconnected = await repository.disconnect();
    expect(isDisconnected).toBeTruthy();
});