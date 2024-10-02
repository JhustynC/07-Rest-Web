import { Request, Response } from "express";
import { prisma } from "../../data/postgres";
import { CreateTodoDto } from "../../domain/dtos";
import { UpdateTodoDto } from "../../domain/dtos/todos/update-todo.dto";

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

    //? Using Prisma ORM
    const todo = await prisma.todo.findUnique({
      where: {
        id: todoId,
      },
    });

    todo ? res.json(todo) : res.status(404).json({ message: "Todo not found" });
  };

  public createTodo = async (req: Request, res: Response) => {
    const [error, createTodoDto] = CreateTodoDto.create(req.body);
    if (error) return res.status(400).json({ error: error });

    //? Using Prisma ORM
    const todo = await prisma.todo.create({
      data: createTodoDto!,
    });

    res.json(todo);
  };

  public updateTodo = async (req: Request, res: Response) => {
    const id = +req.params.id;
    console.log(id);
    const [error, updateTodoDto] = UpdateTodoDto.create({ ...req.body, id });

    if (error) return res.status(400).json({ error });

    //? Using Prisma ORM
    const todo = await prisma.todo.update({
      where: {
        id,
      },
      data: updateTodoDto!.values,
    });

    if (!todo)
      return res.status(404).json({ message: `Todo with ${id} id, not found` });

    //? Los objetos se pasan por referencia entonces modificamos directamente la entidad
    res.json(todo);
  };

  public deleteTodo = async (req: Request, res: Response) => {
    const id = +req.params.id;
    if (isNaN(id)) return res.status(400).json({ message: "Invalid ID" });

    //? Using Prisma ORM
    const deleted = await prisma.todo.delete({
      where: {
        id,
      },
    });

    deleted
      ? res.json(deleted)
      : res.status(404).json({ message: `Todo with ${id} id, not found` });
  };
}
