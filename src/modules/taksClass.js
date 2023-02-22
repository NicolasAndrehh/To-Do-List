export default class Task {
  constructor(description, taskList) {
    this.description = description;
    this.completed = false;
    this.index = taskList;
  }
}