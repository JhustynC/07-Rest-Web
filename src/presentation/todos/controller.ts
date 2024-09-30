import { Request, Response } from "express";
import { prisma } from "../../data/postgres";


// const todos = [
//   { id: 1, title: "Task 1", completed: false, completedAt: new Date() },
//   { id: 2, title: "Task 2", completed: true, completedAt: null },
//   { id: 3, title: "Task 3", completed: false, completedAt: new Date() },
// ];

export class TodosController {
  //*DI
  constructor() {}

  public getTodos = async (req: Request, res: Response) => {
    //? Using Prisma ORM
    const todos = await prisma.todo.findMany();

    res.json(todos);
  };

  public getTodoById = async (req: Request, res: Response) => {
    var { id } = req.params;
    const todoId = Number.parseInt(id);
    if (isNaN(todoId)) return res.status(400).json({ message: "Invalid ID" });
    // const todo = todos.find((t) => t.id === todoId);

    //? Using Prisma ORM
    const todo = await prisma.todo.findUnique({
      where: {
        id: todoId,
      },
    });

    todo ? res.json(todo) : res.status(404).json({ message: "Todo not found" });
  };

  public createTodo = async (req: Request, res: Response) => {
    const { title } = req.body;
    if (!title) return res.status(400).json({ message: "Title is required" });

    const todo = await prisma.todo.create({
      data: {
        title,
      },
    });

    // const todo = {
    //   id: todos.length + 1,
    //   title,
    //   completed: false,
    //   completedAt: new Date(),
    // };
    // ? todos.push(todo);

    res.json(todo);
  };

  public updateTodo = async (req: Request, res: Response) => {
    const id = +req.params.id;
    if (isNaN(id)) return res.status(400).json({ message: "Invalid ID" });

    // const todo = todos.find((t) => t.id === id);
    const { title, createdAt, completed } = req.body;

    //? Using Prisma ORM
    const todo = await prisma.todo.update({
      where: {
        id,
      },
      data: {
        ...req.body,
      },
    });

    if (!todo)
      return res.status(404).json({ message: `Todo with ${id} id, not found` });
    // // if (!title) return res.status(404).json({ message: `Title is required` });
    // todo.title = title || todo.title;
    // todo.completedAt = new Date(createdAt ?? todo.completedAt);
    // todo.completed = completed || todo.completed;
    //! Los objetos se pasan por referencia entonces modificamos directamente la entidad
    res.json(todo);
  };

  public deleteTodo = async (req: Request, res: Response) => {
    const id = +req.params.id;
    if (isNaN(id)) return res.status(400).json({ message: "Invalid ID" });

    //? Using Prisma ORM
    const todo = await prisma.todo.delete({
      where: {
        id,
      },
    });

    // const todoIndex = todos.findIndex((t) => t.id === id);
    // if (todoIndex === -1)
      // return res.status(404).json({ message: `Todo with ${id} id, not found` });
    // const todo = todos.splice(todoIndex, 1);
    return res.json(todo); // No content response
  };
}
