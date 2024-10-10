import { TodoEntity } from "../../entities/todo.entity";
import { AbsTodoRepository } from "../../repositories/todo.repository";

export interface IGetTodosUseCase {
  exceute(): Promise<TodoEntity[]>;
}

export class GetTodos implements IGetTodosUseCase {
  constructor(public readonly repository: AbsTodoRepository) {}

  async exceute(): Promise<TodoEntity[]> {
    return await this.repository.getAll();
  }
}
