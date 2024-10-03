export class TodoEntity {
  constructor(
    public readonly id: number,
    public readonly title: string,
    public readonly completed: boolean,
    public readonly completedAt?: Date | null
  ) {}

  get isCompleted() {
    return this.completedAt ? true : false;
  }

  static fromJSON() {
    // Implement conversion from JSON to TodoEntity here
    return null; // Placeholder return value
  }

  public static fromObject(object: { [key: string]: any }): TodoEntity {
    const { id, title, completed, completedAt } = object;
    if (!id) throw new Error("Id is required");
    if (!title) throw new Error("Title is required");
    if (!completed) throw new Error("Completed is required");

    let newCompletedAt;
    if (completedAt) {
      newCompletedAt = new Date(completedAt);
      if (!isNaN(newCompletedAt.getTime())) {
        // Verifica si la fecha es válida
        throw new Error("Invalid completedAt format");
      }
    }

    return new TodoEntity(id, title, completed, newCompletedAt);
  }
}
