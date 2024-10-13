import { CreateTodoDto } from "../../dtos";
import { TodoEntity } from "../../entities/todo.entity";
import { AbsTodoRepository } from "../../repositories/todo.repository";

export interface IDeleteTodoUseCase {
  exceute(id: number): Promise<TodoEntity>;
}

export class DeleteTodo implements IDeleteTodoUseCase {
  constructor(public readonly repository: AbsTodoRepository) {}

  async exceute(id: number): Promise<TodoEntity> {
    return await this.repository.delete(id);
  }
}
