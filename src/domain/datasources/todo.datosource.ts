import { CreateTodoDto } from "../dtos";
import { TodoEntity } from "../entities/todo.entity";

export abstract class AbsTodoDatasource {
  abstract create(createTodoDto: CreateTodoDto): Promise<TodoEntity>;

  //Todo: paginación
  abstract getAll(): Promise<TodoEntity[]>;

  abstract getById(id: number): Promise<TodoEntity | undefined>;

  abstract update(
    updateTodoDto: CreateTodoDto
  ): Promise<TodoEntity | undefined>;

  abstract delete(id: number): Promise<TodoEntity>;
}
