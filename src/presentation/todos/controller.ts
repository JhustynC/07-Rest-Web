import { Request, Response } from "express";
const todos = [
  { id: 1, title: "Task 1", completed: false, completedAt: new Date() },
  { id: 2, title: "Task 2", completed: true, completedAt: null },
  { id: 3, title: "Task 3", completed: false, completedAt: new Date() },
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
    const { title } = req.body;
    if (!title) return res.status(400).json({ message: "Title is required" });
    const todo = {
      id: todos.length + 1,
      title,
      completed: false,
      completedAt: new Date(),
    };
    todos.push(todo);
    res.json(todo);
  };

  public updateTodo = (req: Request, res: Response) => {
    const id = +req.params.id;
    if (isNaN(id)) return res.status(400).json({ message: "Invalid ID" });
    const todo = todos.find((t) => t.id === id);
    if (!todo)
      return res.status(404).json({ message: `Todo with ${id} id, not found` });
    const { title, createdAt, completed } = req.body;
    // if (!title) return res.status(404).json({ message: `Title is required` });
    todo.title = title || todo.title;
    todo.completedAt = new Date(createdAt ?? todo.completedAt);
    todo.completed = completed || todo.completed;
    //! Los objetos se pasan por referencia entonces modificamos directamente la entidad
    res.json(todo);
  };

  public deleteTodo = (req: Request, res: Response) => {
    const id = +req.params.id;
    if (isNaN(id)) return res.status(400).json({ message: "Invalid ID" });
    const todoIndex = todos.findIndex((t) => t.id === id);
    if (todoIndex === -1)
      return res.status(404).json({ message: `Todo with ${id} id, not found` });
    const todo = todos.splice(todoIndex, 1);
    return res.json(todo[0]); // No content response
  };
}
