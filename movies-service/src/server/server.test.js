import { test, expect, jest, afterAll } from "@jest/globals";
import server from "./server.js";
import request from "supertest";

const apiMock = jest.fn((app, repository) => {
  app.get("/error", (req, res, next) => {
    throw new Error("Mock error");
  });
});

test("Server Start", async () => {
  const app = await server.start(apiMock);
  expect(app).toBeTruthy();
});

test("Health Check", async () => {
  process.env.PORT = 3002;
  const app = await server.start(apiMock);
  const response = await request(app).get("/health");
  expect(response.status).toEqual(200);
});

test("Error Check", async () => {
  process.env.PORT = 3003;
  const app = await server.start(apiMock);
  const response = await request(app).get("/error");
  expect(response.status).toEqual(500);
});

test("Server Stop", async () => {
  const isStopped = await server.stop();
  expect(isStopped).toBeTruthy();
});

afterAll(async () => {
  await server.stop();
});
