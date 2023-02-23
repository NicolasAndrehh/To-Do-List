export default class Task {
  constructor(description, completed = false, taskList) {
    this.description = description;
    this.completed = completed;
    this.index = taskList;
  }
}