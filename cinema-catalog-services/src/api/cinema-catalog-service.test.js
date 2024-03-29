import {
  test,
  expect,
  jest,
  beforeEach,
  afterEach,
  beforeAll,
  afterAll,
} from "@jest/globals";
import server from "../server/server.js";
import cinemaCatalog from "./cinema-catalog-service.js";
import repositoryMock from "../repository/__mocks__/repository.js";
import request from "supertest";
import jwt from "jsonwebtoken";

const adminToken = "1";
const guestToken = "2";

beforeEach(() => {
  jest.spyOn(jwt, "verify").mockImplementation((token, secret, callback) => {
    if (token === adminToken) return { userId: 1, profileId: 1 }; //ADMIN
    else if (token === guestToken) return { userId: 2, profileId: 2 }; //GUEST
    else throw new Error("Invalid token!");
  });
});

afterEach(() => {
  jest.restoreAllMocks();
});

let app = null;

beforeAll(async () => {
  process.env.PORT = 3004;
  app = await server.start(cinemaCatalog, repositoryMock);
});

afterAll(async () => {
  await server.stop();
});

describe("Cinema Catalog Services 200 OK", () => {
  test("GET /cities 200 OK", async () => {
    const response = await request(app)
      .get("/cities")
      .set("authorization", `Bearer ${adminToken}`);
    expect(response.status).toEqual(200);
    expect(Array.isArray(response.body)).toBeTruthy();
    expect(response.body.length).toBeTruthy();
  });

  test("GET /cities/:cityId/movies 200 OK", async () => {
    const testCityId = "1";
    const response = await request(app)
      .get(`/cities/${testCityId}/movies`)
      .set("authorization", `Bearer ${adminToken}`);
    expect(response.status).toEqual(200);
    expect(response.body).toBeTruthy();
  });

  test("GET /cities/:cityId/movies/:movieId 200 OK", async () => {
    const testCityId = "1";
    const testMovieId = "1";
    const response = await request(app)
      .get(`/cities/${testCityId}/movies/${testMovieId}`)
      .set("authorization", `Bearer ${adminToken}`);
    expect(response.status).toEqual(200);
    expect(response.body).toBeTruthy();
  });

  test("GET /cities/:cityId/cinemas 200 OK", async () => {
    const testCityId = "1";
    const response = await request(app)
      .get(`/cities/${testCityId}/cinemas`)
      .set("authorization", `Bearer ${adminToken}`);
    expect(response.status).toEqual(200);
    expect(response.body).toBeTruthy();
  });

  test("GET /cinemas/:cinemaId/movies 200 OK", async () => {
    const testCinemaId = "1";
    const response = await request(app)
      .get(`/cinemas/${testCinemaId}/movies`)
      .set("authorization", `Bearer ${adminToken}`);
    expect(response.status).toEqual(200);
    expect(response.body).toBeTruthy();
  });

  test("GET /cinemas/:cinemaId/movies/:movieId 200 OK", async () => {
    const testCinemaId = "1";
    const testMovieId = "1";
    const response = await request(app)
      .get(`/cinemas/${testCinemaId}/movies/${testMovieId}`)
      .set("authorization", `Bearer ${adminToken}`);
    expect(response.status).toEqual(200);
    expect(response.body).toBeTruthy();
  });
});

describe("Cinema Catalog Services 401/404 ERROR", () => {
  test("GET /cities 401", async () => {
    const response = await request(app).get("/cities");
    expect(response.status).toEqual(401);
  });

  test("GET /cities 401 UNAUTHORIZED (token error)", async () => {
    const response = await request(app)
      .get("/cities")
      .set("authorization", `Bearer 3`);
    expect(response.status).toEqual(401);
  });

  test("GET /cities/:cityId/movies 401", async () => {
    const testCityId = "1";
    const response = await request(app).get(`/cities/${testCityId}/movies`);
    expect(response.status).toEqual(401);
  });

  test("GET /cities/:cityId/movies 404 NOT FOUND", async () => {
    const testCityId = "-1";
    const response = await request(app)
      .get(`/cities/${testCityId}/movies`)
      .set("authorization", `Bearer ${adminToken}`);
    expect(response.status).toEqual(404);
  });

  test("GET /cities/:cityId/movies/:movieId 401", async () => {
    const testCityId = "1";
    const testMovieId = "1";
    const response = await request(app).get(
      `/cities/${testCityId}/movies/${testMovieId}`
    );
    expect(response.status).toEqual(401);
  });

  test("GET /cities/:cityId/movies/:movieId 404 NOT FOUND", async () => {
    const testCityId = "1";
    const testMovieId = "-1";
    const response = await request(app)
      .get(`/cities/${testCityId}/movies/${testMovieId}`)
      .set("authorization", `Bearer ${adminToken}`);
    expect(response.status).toEqual(404);
  });

  test("GET /cities/:cityId/cinemas 404 NOT FOUND", async () => {
    const testCityId = "-1";
    const response = await request(app)
      .get(`/cities/${testCityId}/cinemas`)
      .set("authorization", `Bearer ${adminToken}`);
    expect(response.status).toEqual(404);
  });

  test("GET /cities/:cityId/cinemas 401 OK", async () => {
    const testCityId = "1";
    const response = await request(app).get(`/cities/${testCityId}/cinemas`);
    expect(response.status).toEqual(401);
  });

  test("GET /cinemas/:cinemaId/movies 401", async () => {
    const testCinemaId = "1";
    const response = await request(app).get(`/cinemas/${testCinemaId}/movies`);
    expect(response.status).toEqual(401);
  });

  test("GET /cinemas/:cinemaId/movies 404 NOT FOUND", async () => {
    const testCinemaId = "-1";
    const response = await request(app)
      .get(`/cinemas/${testCinemaId}/movies`)
      .set("authorization", `Bearer ${adminToken}`);
    expect(response.status).toEqual(404);
  });

  test("GET /cinemas/:cinemaId/movies/:movieId 401", async () => {
    const testCinemaId = "1";
    const testMovieId = "1";
    const response = await request(app).get(
      `/cinemas/${testCinemaId}/movies/${testMovieId}`
    );
    expect(response.status).toEqual(401);
  });

  test("GET /cinemas/:cinemaId/movies/:movieId 404 NOT FOUND", async () => {
    const testCinemaId = "1";
    const testMovieId = "-1";
    const response = await request(app)
      .get(`/cinemas/${testCinemaId}/movies/${testMovieId}`)
      .set("authorization", `Bearer ${adminToken}`);
    expect(response.status).toEqual(404);
  });
});
