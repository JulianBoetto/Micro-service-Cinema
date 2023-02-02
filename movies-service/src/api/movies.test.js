import { test, expect, jest } from "@jest/globals";
import server from "../server/server.js";
import movies from "./movies.js";
import repositoryMock from "../repository/__mocks__/repository.js";
import request from "supertest";

let app = null;

beforeAll(async () => {
    app = await server.start(movies, repositoryMock);
})

afterAll(async () => {
    await server.stop();
})

test("GET /movies", async () => {
    request(app)
        .get("/movies")
        .expect('Content-Type', /json/)
        .expect(200);
})

test("GET /movies/:id", async () => {
    const idMovieMock = "1";
    request(app)
        .get(`/movies/${idMovieMock}`)
        .expect('Content-Type', /json/)
        .expect(200)
        .expect(idMovieMock);
})

test("GET /movies/premieres ", async () => {
    request(app)
        .get("/movies/premieres")
        .expect('Content-Type', /json/)
        .expect(200);
})