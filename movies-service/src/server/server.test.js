import { test, expect, jest } from "@jest/globals";
import server from "./server.js";
import request from "supertest";

const apiMock = jest.fn((app, repository) => true);

test("Server Start", async () => {
    const app = await server.start(apiMock);
    expect(app).toBeTruthy();
})

test("Health Check", async () => {
    process.env.PORT = 3001;
    const app = await server.start(apiMock);
    request(app)
    .get("/health")
    .expect('Content-Type', /json/)
    .expect(200);
})

test("Server Stop", async () => {
    const isStopped = await server.stop();
    expect(isStopped).toBeTruthy();
})