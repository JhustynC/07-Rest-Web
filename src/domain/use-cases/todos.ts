interface ICreateTodoUseCase {
  createTodo(title: string, description: string): void;
}

export class CreateTodoUseCase implements ICreateTodoUseCase {
  createTodo(title: string, description: string): void {
    throw new Error("Method not implemented.");
  }
}
