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