interface ICreateTodoUseCase {
  createTodo(title: string, description: string): void;
}

export class CreateTodoUseCase implements ICreateTodoUseCase {
  createTodo(title: string, description: string): void {
    throw new Error("Method not implemented.");
  }
}

export class UpdateTodoUseCase {
  static execute = () => {
    //TODO: Implementación del caso de uso UpdateTodoUseCase
  };
}

export class DeleteTodoUseCase {
  static execute = () => {
    //TODO: Implementación del caso de uso DeleteTodoUseCase
  };
}

//? Se pueden crear los diferentes casos de un solo modulo en un archivo
//? O es necesario que este casa caso de uso en un solo archivo
