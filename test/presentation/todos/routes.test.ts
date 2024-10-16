import request from "supertest";
import { testServer } from "../../test-server";

describe("presentation/todos/routes.ts", () => {
  beforeAll(async () => {
    await testServer.start();
  });

  afterAll(async () => {
    await testServer.stop();
  });

  test("Should return todos api/v1/todos", async () => {
    const response = await request(testServer.invoke).get("/api/v1/todos");

  });
});
