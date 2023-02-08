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

test("GET /movies 200 OK", async () => {
    const response = await request(app)
        .get("/movies")
    expect(response.status).toEqual(200);
    expect(Array.isArray(response.body)).toBeTruthy();
    expect(response.body.length).toBeTruthy();
})

test("GET /movies/:id 200 OK", async () => {
    const idMovieMock = "1";
    const response = await request(app)
        .get(`/movies/${idMovieMock}`)
    expect(response.status).toEqual(200);
    expect(response.body).toBeTruthy();
    expect(response.body._id).toEqual(idMovieMock);
})

test("GET /movies/premieres 200 OK", async () => {
    const response = await request(app)
        .get("/movies/premieres")
    expect(response.status).toEqual(200);
    expect(Array.isArray(response.body)).toBeTruthy();
    expect(response.body.length).toBeTruthy();
})