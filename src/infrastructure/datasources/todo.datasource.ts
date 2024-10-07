import { prisma } from "../../data/postgres";
import {
  AbsTodoDatasource,
  CreateTodoDto,
  TodoEntity,
  UpdateTodoDto,
} from "../../domain";

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

    return todoObject ? TodoEntity.fromObject(todoObject) : undefined;
  }

  async update(updateTodoDto: UpdateTodoDto): Promise<TodoEntity | undefined> {
    const { title, id } = updateTodoDto;
    const todo = await prisma.todo.update({
      where: {
        id,
      },
      data: {
        title,
      },
    });
    return todo ? TodoEntity.fromObject(todo) : undefined;
  }

  async delete(id: number): Promise<void> {
    const todo = await prisma.todo.delete({
      where: {
        id,
      },
    });
    return todo ? Promise.resolve() : undefined;
  }
}
