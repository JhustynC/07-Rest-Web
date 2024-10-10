
import { TodoEntity } from "../../entities/todo.entity";
import { AbsTodoRepository } from "../../repositories/todo.repository";

export interface IGetTodoUseCase {
  exceute(id: number): Promise<TodoEntity | undefined>;
}

export class GetTodo implements IGetTodoUseCase {
  constructor(public readonly repository: AbsTodoRepository) {}

  async exceute(id: number): Promise<TodoEntity | undefined> {
    return await this.repository.getById(id);
  }
}


