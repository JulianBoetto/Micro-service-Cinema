import {
  test,
  expect,
  jest,
  beforeAll,
  afterAll,
  beforeEach,
  afterEach,
} from "@jest/globals";
import server from "../server/server.js";
import movies from "./movies.js";
import repositoryMock from "../repository/__mocks__/repository.js";
import request from "supertest";
import jwt from "jsonwebtoken";

let app = null;

const adminToken = "1";
const guestToken = "2";

beforeEach(() => {
  jest.spyOn(jwt, "verify").mockImplementation((token, secret) => {
    if (token === adminToken) return { userId: 1, profileId: 1 }; //ADMIN
    else if (token === guestToken) return { userId: 2, profileId: 2 }; //GUEST
    else throw new Error("Invalid token!");
  });
});

afterEach(() => {
  jest.restoreAllMocks();
});

beforeAll(async () => {
  process.env.PORT = 3003;
  app = await server.start(movies, repositoryMock);
});

afterAll(async () => {
  await server.stop();
});

describe("Movies 200 OK", () => {
  test("GET /movies", async () => {
    const response = await request(app)
      .get("/movies")
      .set("authorization", `Bearer ${adminToken}`);
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBeTruthy();
    expect(response.body.length).toBeTruthy();
  });

  test("GET /movies/:id", async () => {
    const idMovieMock = "1";
    const response = await request(app)
      .get(`/movies/${idMovieMock}`)
      .set("authorization", `Bearer ${adminToken}`);
    expect(response.status).toEqual(200);
    expect(response.body).toBeTruthy();
    expect(response.body._id).toEqual(idMovieMock);
  });

  test("GET /movies/premieres", async () => {
    const response = await request(app)
      .get("/movies/premieres")
      .set("authorization", `Bearer ${adminToken}`);
    expect(response.status).toEqual(200);
    expect(Array.isArray(response.body)).toBeTruthy();
    expect(response.body.length).toBeTruthy();
  });

  test("POST /movies/ 201 OK", async () => {
    const movie = {
      title: "Test Movie",
      synopsis: "Test Summary",
      duration: 120,
      releaseDate: new Date(),
      image: "http://image.jpg",
      categories: ["Adventure"],
    };

    const response = await request(app)
      .post("/movies/")
      .set("Content-Type", "application/json")
      .set("authorization", `Bearer ${adminToken}`)
      .send(movie);

    expect(response.status).toEqual(201);
    expect(response.body).toBeTruthy();
  });

  test("DELETE /movies/:id 204 NO CONTENT", async () => {
    const response = await request(app)
      .delete("/movies/1")
      .set("authorization", `Bearer ${adminToken}`);
    expect(response.status).toEqual(204);
  });
});

describe("Movies 401/404 ERROR", () => {
  test("GET /movies 401 UNAUTHORIZED (token error)", async () => {
    const response = await request(app)
      .get("/movies")
      .set("authorization", `Bearer 3`);
    expect(response.status).toEqual(401);
  });

  test("GET /movies 401 UNAUTHORIZED", async () => {
    const response = await request(app).get("/movies");
    expect(response.status).toEqual(401);
  });

  test("GET /movies/:id 401", async () => {
    const testMovieId = "1";
    const response = await request(app).get(`/movies/${testMovieId}`);
    expect(response.status).toEqual(401);
  });

  test("GET /movies/:id 404 NOT FOUND", async () => {
    const testMovieId = "-1";
    const response = await request(app)
      .get(`/movies/${testMovieId}`)
      .set("authorization", `Bearer ${adminToken}`);
    expect(response.status).toEqual(404);
  });

  test("GET /movies/premieres 401", async () => {
    const response = await request(app).get("/movies/premieres");
    expect(response.status).toEqual(401);
  });

  test("POST /movies/ 401 UNAUTHORIZED", async () => {
    const movie = {
      title: "Test Movie",
      synopsis: "Test Summary",
      duration: 120,
      releaseDate: new Date(),
      image: "http://image.jpg",
      categories: ["Adventure"],
    };

    const response = await request(app)
      .post("/movies/")
      .set("Content-Type", "application/json")
      .send(movie);

    expect(response.status).toEqual(401);
  });

  test("POST /movies/ 403 FORBIDDEN", async () => {
    const movie = {
      title: "Test Movie",
      synopsis: "Test Summary",
      duration: 120,
      releaseDate: new Date(),
      image: "http://image.jpg",
      categories: ["Adventure"],
    };

    const response = await request(app)
      .post("/movies/")
      .set("Content-Type", "application/json")
      .set("authorization", `Bearer ${guestToken}`)
      .send(movie);

    expect(response.status).toEqual(403);
  });

  test("POST /movies/ 422 UNPROCESSABLE ENTITY", async () => {
    const movie = { xyz: "luiz" };

    const response = await request(app)
      .post("/movies/")
      .set("Content-Type", "application/json")
      .set("authorization", `Bearer ${adminToken}`)
      .send(movie);

    expect(response.status).toEqual(422);
  });

  test("DELETE /movies/:id 401", async () => {
    const response = await request(app).delete("/movies/1");
    expect(response.status).toEqual(401);
  });

  test("DELETE /movies/:id 403 FORBIDDEN", async () => {
    const response = await request(app)
      .delete("/movies/1")
      .set("authorization", `Bearer ${guestToken}`);
    expect(response.status).toEqual(403);
  });
});
