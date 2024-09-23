import { Request, Response } from "express";
const todos = [
  { id: 1, title: "Task 1", completed: false, createdAt: new Date() },
  { id: 2, title: "Task 2", completed: true, createdAt: null },
  { id: 3, title: "Task 3", completed: false, createdAt: new Date() },
];

export class TodosController {
  
  //*DI
  constructor() {}

  public getTodos = (req: Request, res: Response) => {
    res.json(todos);
  };

  public getTodoById = (req: Request, res: Response) => {
    var { id } = req.params;
    const todoId = Number.parseInt(id);
    if (isNaN(todoId)) return res.status(400).json({ message: "Invalid ID" });
    const todo = todos.find((t) => t.id === todoId);
    todo ? res.json(todo) : res.status(404).json({ message: "Todo not found" });
  };

  public createTodo = (req: Request, res: Response) => {
    const body = req.body
    res.json(body)
  };

  public updateTodo = (req: Request, res: Response) => {};

  public deleteTodo = (req: Request, res: Response) => {};
}
