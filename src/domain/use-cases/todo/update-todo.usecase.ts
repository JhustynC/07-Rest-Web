import {  UpdateTodoDto } from "../../dtos";
import { TodoEntity } from "../../entities/todo.entity";
import { AbsTodoRepository } from "../../repositories/todo.repository";

export interface IUpdateTodoUseCase {
  exceute(dto: UpdateTodoDto): Promise<TodoEntity | undefined>;
}

export class UpdateTodo implements IUpdateTodoUseCase {
  constructor(public readonly repository: AbsTodoRepository) {}

  async exceute(dto: UpdateTodoDto): Promise<TodoEntity | undefined> {
    return await this.repository.update(dto);
  }
}
