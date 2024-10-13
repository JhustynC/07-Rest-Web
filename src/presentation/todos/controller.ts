import { Request, Response } from "express";
import {
  AbsTodoRepository,
  CreateTodoDto,
  UpdateTodoDto,
  GetTodo,
  GetTodos,
  CreateTodo,
  DeleteTodo,
  UpdateTodo,
} from "../../domain";

export class TodosController {
  //*DI
  constructor(private readonly repository: AbsTodoRepository) {}

  public getTodos = (req: Request, res: Response) => {
    new GetTodos(this.repository)
      .exceute()
      .then((todos) => res.json(todos))
      .catch((err) => res.status(404).json({ error: `${err}` }));
  };

  public getTodoById = (req: Request, res: Response) => {
    var todoId = Number.parseInt(req.params.id);
    new GetTodo(this.repository)
      .exceute(todoId)
      .then((todo) => res.json(todo))
      .catch((err) => res.status(404).json({ error: `${err}` }));
  };

  public createTodo = (req: Request, res: Response) => {
    const [error, createTodoDto] = CreateTodoDto.create(req.body);
    if (error) return res.status(400).json({ error: error });

    new CreateTodo(this.repository)
      .exceute(createTodoDto!)
      .then((todo) => res.json(todo))
      .catch((err) => res.status(404).json({ error: `${err}` }));
  };

  public updateTodo = (req: Request, res: Response) => {
    const id = +req.params.id;
    const [error, updateTodoDto] = UpdateTodoDto.create({ ...req.body, id });
    if (error) return res.status(400).json({ error });

    //? Using Prisma ORM
    new UpdateTodo(this.repository)
      .exceute(updateTodoDto!)
      .then((todo) => res.json(todo))
      .catch((err) => res.status(404).json({ error: `${err}` }));
  };

  public deleteTodo = async (req: Request, res: Response) => {
    const id = +req.params.id;
    if (isNaN(id)) return res.status(400).json({ error: "Invalid ID" });

    new DeleteTodo(this.repository)
      .exceute(id)
      .then((todo) => res.json(todo))
      .catch((err) => res.status(400).json({ error: `${err}` }));
  };
}
