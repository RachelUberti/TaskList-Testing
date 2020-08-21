// Set Class for Task framework - Can tell it's a class because name is capitalized
// Declare all fields of "Add Task Modal"
export default class Task {
  constructor(id, taskName, assignee, status, description, dueDate) {
    this.id = id;
    this.taskName = taskName;
    this.assignee = assignee;
    this.status = status;
    this.description = description;
    this.dueDate = dueDate;
  }
}
