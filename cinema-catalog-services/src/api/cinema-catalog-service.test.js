import { test, expect, jest } from "@jest/globals";
import server from "../server/server.js";
import movies from "./movies.js";
import repositoryMock from "../repository/__mocks__/repository.js";
import request from "supertest";

let app = null;

beforeAll(async () => {
    process.env.PORT = 3003;
    app = await server.start(movies, repositoryMock);
})

afterAll(async () => {
    await server.stop();
})

describe("Movies 200 OK", () => {
    test("GET /movies", async () => {
        const response = await request(app)
            .get("/movies")
        expect(response.status).toEqual(200);
        expect(Array.isArray(response.body)).toBeTruthy();
        expect(response.body.length).toBeTruthy();
    })

    test("GET /movies/:id", async () => {
        const idMovieMock = "1";
        const response = await request(app)
            .get(`/movies/${idMovieMock}`)
        expect(response.status).toEqual(200);
        expect(response.body).toBeTruthy();
        expect(response.body._id).toEqual(idMovieMock);
    })

    test("GET /movies/premieres", async () => {
        const response = await request(app)
            .get("/movies/premieres")
        expect(response.status).toEqual(200);
        expect(Array.isArray(response.body)).toBeTruthy();
        expect(response.body.length).toBeTruthy();
    })
})

describe("Movies 404 NOT FOUND", () => {
    test("GET /movies/:id", async () => {
        const testMovieId = "-1";
        const response = await request(app)
            .get(`/movies/${testMovieId}`)
        expect(response.status).toEqual(404);
    })
})