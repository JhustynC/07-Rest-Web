import { prisma } from "../../data/postgres";
import {
  AbsTodoDatasource,
  CreateTodoDto,
  TodoEntity,
  UpdateTodoDto,
} from "../../domain";

export class TodoDatasourceImp implements AbsTodoDatasource {
  async create(createTodoDto: CreateTodoDto): Promise<TodoEntity> {
    const todo = await prisma.todo.create({
      data: createTodoDto,
    });

    return TodoEntity.fromObject(todo);
  }

  async getAll(): Promise<TodoEntity[]> {
    const todos = await prisma.todo.findMany();
    return todos.map((todo) => TodoEntity.fromObject(todo));
  }

  async getById(id: number): Promise<TodoEntity | undefined> {
    const todoObject = await prisma.todo.findUnique({
      where: {
        id: id,
      },
    });
    if (todoObject) return TodoEntity.fromObject(todoObject!);
    throw `Todo with id ${id} not found`;
  }

  async update(updateTodoDto: UpdateTodoDto): Promise<TodoEntity | undefined> {
    const { id } = updateTodoDto;

    await this.getById(id);

    const updateTodo = await prisma.todo.update({
      where: {
        id: id,
      },
      data: {
        ...updateTodoDto.values,
      },
    });

    if (updateTodo) return TodoEntity.fromObject(updateTodo);
  }

  async delete(id: number): Promise<TodoEntity> {
    await this.getById(id);

    const todo = await prisma.todo.delete({
      where: {
        id,
      },
    });

    if (todo) return TodoEntity.fromObject(todo);
    throw `Error deleting todo with id ${id}`;
  }
}
