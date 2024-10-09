import { Request, Response } from "express";
import { prisma } from "../../data/postgres";
import { AbsTodoRepository, CreateTodoDto, UpdateTodoDto } from "../../domain";

export class TodosController {
  //*DI
  constructor(private readonly repository: AbsTodoRepository) {}

  public getTodos = async (req: Request, res: Response) => {
    //? Using Prisma ORM
    const todos = await this.repository.getAll();
    return res.json(todos);
  };

  public getTodoById = async (req: Request, res: Response) => {
    var todoId = Number.parseInt(req.params.id);

    try {
      const todo = await this.repository.getById(todoId);
      return res.json(todo);
    } catch (err) {
      res.status(404).json({ message: `${err}` });
    }
  };

  public createTodo = async (req: Request, res: Response) => {
    const [error, createTodoDto] = CreateTodoDto.create(req.body);
    if (error) return res.status(400).json({ error: error });

    const todo = await this.repository.create(createTodoDto!);

    res.json(todo);
  };

  public updateTodo = async (req: Request, res: Response) => {
    const id = +req.params.id;
    const [error, updateTodoDto] = UpdateTodoDto.create({ ...req.body, id });
    if (error) return res.status(400).json({ error });

    //? Using Prisma ORM
    const todo = await this.repository.update(updateTodoDto!);

    if (!todo)
      return res.status(404).json({ message: `Todo with ${id} id, not found` });

    //? Los objetos se pasan por referencia entonces modificamos directamente la entidad
    res.json(todo);
  };

  public deleteTodo = async (req: Request, res: Response) => {
    const id = +req.params.id;
    if (isNaN(id)) return res.status(400).json({ message: "Invalid ID" });

    try {
      const deleted = await this.repository.delete(id);
      return res.json(deleted);
    } catch (err) {
      return res.status(404).json({ message: `${err}` });
    }
  };
}
