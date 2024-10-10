import { CreateTodoDto } from "../../dtos";
import { TodoEntity } from "../../entities/todo.entity";
import { AbsTodoRepository } from "../../repositories/todo.repository";

export interface IDeleteTodoUseCase {
  exceute(dto: CreateTodoDto): Promise<TodoEntity>;
}

export class DeleteTodo implements IDeleteTodoUseCase {
  constructor(public readonly repository: AbsTodoRepository) {}

  async exceute(dto: CreateTodoDto): Promise<TodoEntity> {
    return await this.repository.create(dto);
  }
}
