import {
  AbsTodoDatasource,
  AbsTodoRepository,
  CreateTodoDto,
  TodoEntity,
} from "../../domain";

export class TodoRepositoryImp implements AbsTodoRepository {
  constructor(private readonly datasource: AbsTodoDatasource) {}

  create(createTodoDto: CreateTodoDto): Promise<TodoEntity> {
    return this.datasource.create(createTodoDto);
  }
  getAll(): Promise<TodoEntity[]> {
    return this.datasource.getAll();
  }
  getById(id: number): Promise<TodoEntity | undefined> {
    return this.datasource.getById(id);
  }
  update(updateTodoDto: CreateTodoDto): Promise<TodoEntity | undefined> {
    return this.datasource.update(updateTodoDto);
  }
  delete(id: number): Promise<TodoEntity> {
    return this.datasource.delete(id);
  }
}
