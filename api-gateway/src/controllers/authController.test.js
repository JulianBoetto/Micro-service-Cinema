import { test, expect, beforeAll, afterAll, jest } from "@jest/globals";
import app from "../server/index";
import request from "supertest";
import repository from "../repository/repository.js";
import { ObjectId } from "mongodb";
import authController from "./authController";

const loginOk = {
  email: "julib_8724@hotmail.com",
  password: "123456",
};

const loginNOk = {
  email: "julib_8724@hotmail.com",
  password: "12345",
};

let token = "";
const tokenBlocklist = new ObjectId().toHexString();

beforeAll(async () => {
  process.env.PORT = 4001;

  const response = await request(app)
    .post("/login/")
    .set("Content-Type", "application/json")
    .send(loginOk);
  token = response.body.token;

  await repository.blocklistToken(tokenBlocklist);
});

afterAll(async () => {
  app.close();
});

describe("Login/Logout SUCCESS", () => {
  test("POST /login/ 200 OK", async () => {
    const response = await request(app)
      .post("/login/")
      .set("Content-Type", "application/json")
      .send(loginOk);

    expect(response.status).toEqual(200);
    expect(response.body.token).toBeTruthy();
  });

  test("DELETE /logout/ 200 OK", async () => {
    const response = await request(app)
      .delete("/logout/")
      .set("Content-Type", "application/json")
      .set("authorization", `Bearer ${token}`);

    expect(response.status).toEqual(200);
  });
});

describe("Login/Logout ERRORS", () => {
  test("POST /login/ 422 UNPROCESSABLE ENTITY", async () => {
    loginOk.date = new Date();

    const response = await request(app)
      .post("/login/")
      .set("Content-Type", "application/json")
      .send(loginOk);

    expect(response.status).toEqual(422);
  });

  test("POST /login/ 401 UNAUTHORIZED", async () => {
    const response = await request(app)
      .post("/login/")
      .set("Content-Type", "application/json")
      .send(loginNOk);

    expect(response.status).toEqual(401);
  });

  test("DELETE /logout/ 401", async () => {
    const response = await request(app)
      .delete("/logout/")
      .set("Content-Type", "application/json")
      .set("authorization", `Bearer ${token}1`);

    expect(response.status).toEqual(401);
  });
  test("DELETE /logout/ 401 (Blacklist)", async () => {
    const response = await request(app)
      .delete("/logout/")
      .set("Content-Type", "application/json")
      .set("authorization", `Bearer ${tokenBlocklist}`);

    expect(response.status).toEqual(401);
  });
});

jest.mock("jsonwebtoken");

describe("validateToken & validateBlocklist", () => {
  it("should return a 401 status if there is no token in the request headers", async () => {
    const req = {
      headers: {},
    };
    const res = {
      sendStatus: jest.fn(),
    };
    const next = jest.fn();

    await authController.validateToken(req, res, next);

    expect(res.sendStatus).toHaveBeenCalledWith(401);
    expect(next).not.toHaveBeenCalled();
  });

  it("should call next() if there is no token in the request headers", async () => {
    const req = {
      headers: {},
    };
    const res = {
      sendStatus: jest.fn(),
    };
    const next = jest.fn();

    await authController.validateBlocklist(req, res, next);

    expect(next).toHaveBeenCalled();
    expect(res.sendStatus).not.toHaveBeenCalled();
  });
});
