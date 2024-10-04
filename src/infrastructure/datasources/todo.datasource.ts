import { prisma } from "../../data/postgres";
import { AbsTodoDatasource, CreateTodoDto, TodoEntity } from "../../domain";

export class TodoDatasourceImp implements AbsTodoDatasource {
  create(createTodoDto: CreateTodoDto): Promise<TodoEntity> {
    throw new Error("Method not implemented.");
  }
  async getAll(): Promise<TodoEntity[]> {
    const todos = await prisma.todo.findMany();
    return todos.map(TodoEntity.fromObject);
  }
  async getById(id: number): Promise<TodoEntity | undefined> {
    const todoObject = await prisma.todo.findUnique({
      where: {
        id: id,
      },
    });  

    return  todoObject ? TodoEntity.fromObject(todoObject) : undefined;
  }
  update(updateTodoDto: CreateTodoDto): Promise<TodoEntity | undefined> {
    throw new Error("Method not implemented.");
  }
  delete(id: number): Promise<void> {
    console.log("implementation");
    return Promise.resolve();
  }
}
