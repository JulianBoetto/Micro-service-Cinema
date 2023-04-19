import { expect, jest } from "@jest/globals";
import database from "../config/db.js";
import repository from "./repository.js";

jest.mock("../config/db.js");

describe("getUser", () => {
  it("should throw an error for an incorrect email and password combination", async () => {
    const email = "user@example.com";
    const password = "wrong_password";
    const db = {
      collection: jest.fn().mockReturnThis(),
      findOne: jest.fn().mockReturnValue(null),
    };
    
    database.connect = jest.fn().mockResolvedValue(db);

    await expect(repository.getUser(email, password)).rejects.toThrow(
      "Wrong user and/or password!"
    );
  });
});
