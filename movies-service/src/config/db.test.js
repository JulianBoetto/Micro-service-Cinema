import { test, expect } from "@jest/globals";
import database from "./db.js";

test("Connection Database", async () => {
  const connection = await database.connect();
  expect(connection).toBeTruthy();
});

test("Disconnection Database", async () => {
  const isDisconnected = await database.disconnect();
  expect(isDisconnected).toBeTruthy();
});

test("Disconnection Database without client connection", async () => {
  await database.disconnect();
  const isDisconnected = await database.disconnect();
  expect(isDisconnected).toBeTruthy();
});

test("Connection Error", async () => {
  process.env.MONGO_CONNECTION = process.env.MONGO_CONNECTION_TEST;
  const connection = await database.connect();
  expect(connection).toBeUndefined();
});
