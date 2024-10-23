import request from "supertest";
import { testServer } from "../../test-server";
import { prisma } from "../../../src/data/postgres";

describe("presentation/todos/routes.ts", () => {
  beforeAll(async () => {
    await testServer.start();
  });

  beforeEach(async () => {
    await prisma.todo.deleteMany();
  });

  afterAll(async () => {
    await testServer.stop();
  });

  const todo1 = {
    title: "Todo 1",
  };

  const todo2 = {
    title: "Todo 2",
  };

  test("Should return todos api/v1/todos", async () => {
    await prisma.todo.createMany({
      data: [todo1, todo2],
    });

    const response = await request(testServer.invoke)
      .get("/api/v1/todos")
      .expect(200);

    const body = response.body;

    expect(body).toBeInstanceOf(Array);
    expect(body.length).toBe(2);
    expect(body[0].title).toBe(todo1.title);
    expect(body[1].title).toBe(todo2.title);
  });

  test("Should return a todo api/v1/todos/:id", async () => {
    const todo = await prisma.todo.create({
      data: todo1,
    });

    const response = await request(testServer.invoke)
      .get(`/api/v1/todos/${todo.id}`)
      .expect(200);

    const body = response.body;

    expect(body).toBeInstanceOf(Object);
    expect(body).toEqual({
      id: todo.id,
      title: "Todo 1",
      completed: false,
      completedAt: null,
    });
  });

  test("Should return a 404 NotFound api/v1/todos/:id", async () => {
    const todoID: number = 999;
    const { body } = await request(testServer.invoke)
      .get(`/api/v1/todos/${todoID}`)
      .expect(404);

    expect(body.error).toBe(`Todo with id ${todoID} not found`);
  });
});
