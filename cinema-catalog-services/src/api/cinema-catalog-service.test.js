import { test, expect, jest } from "@jest/globals";
import server from "../server/server.js";
import cinemaCatalog from "./cinema-catalog-service.js";
import repositoryMock from "../repository/__mocks__/repository.js";
import request from "supertest";

let app = null;

beforeAll(async () => {
    process.env.PORT = 3004;
    app = await server.start(cinemaCatalog, repositoryMock);
})

afterAll(async () => {
    await server.stop();
})

describe("Cinema Catalog Services 200 OK", () => {
    test('GET /cities 200 OK', async () => {
        const response = await request(app).get('/cities');
        expect(response.status).toEqual(200);
        expect(Array.isArray(response.body)).toBeTruthy();
        expect(response.body.length).toBeTruthy();
    })
})