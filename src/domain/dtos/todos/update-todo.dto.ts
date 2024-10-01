export class UpdateTodoDto {
  private constructor(
    public readonly id: number,
    public readonly title: string,
    public readonly completed?: boolean,
    public readonly completedAt?: Date
  ) {}

  public get values() {
    const values: { [key: string]: any } = {};

    if (this.title) {
      values.title = this.title;
    }
    if (this.completed !== undefined) {
      values.completed = this.completed;
    }
    if (this.completedAt) {
      values.completedAt = this.completedAt;
    }

    return values;
  }

  private static isValidDate = (dateString: string): boolean => {
    const date = new Date(dateString);
    return !isNaN(date.getTime()); // Verifica si la fecha es válida
  };

  static create(props: { [key: string]: any }): [string?, UpdateTodoDto?] {
    const { id, title, completed, completedAt } = props;
    let newCompletedAt = undefined;

    if ( !id || isNaN(id)) {
      return ["Id must be a number", undefined];
    }

    if (completed) {
      if (typeof completed !== "boolean") {
        return ["Completed must be a boolean", undefined];
      }
    }

    if (completedAt) {
      if (this.isValidDate(completedAt)) {
        newCompletedAt = new Date(completedAt);
      } else {
        return ["Invalid date format", undefined];
      }
    }

    return [undefined, new UpdateTodoDto(id, title, completed, newCompletedAt)];
  }
}
