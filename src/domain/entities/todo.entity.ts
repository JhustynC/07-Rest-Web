export class TodoEntity {
  constructor(
    public readonly id: number,
    public readonly title: string,
    public readonly completed: boolean,
    public readonly completedAt?: Date
  ) {}

  get isCompleted () {
    return this.completedAt ? true : false
  }

  static fromJSON() {
    // Implement conversion from JSON to TodoEntity here
    return null; // Placeholder return value
  }

  
}
