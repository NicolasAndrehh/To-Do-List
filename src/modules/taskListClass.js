import Task from './taksClass';

export default class TaskList {
  constructor() {
    this.Tasks = [];
  }

  addTask(task) {
    this.Tasks.push(new Task(task, this.Tasks.length));
    console.log(this.Tasks);
    this.showListElements();
  }

  showListElements() {
    const tasksList = document.querySelector('.tasks-list');
    const tasksListHeader = document.createElement('div');
    tasksList.innerHTML = '';
    tasksListHeader.className = 'tasks-list-header row';
    tasksListHeader.innerHTML = '<h3>Today\'s To Do</h3> <i class="fa-solid fa-rotate"></i>';
    tasksList.appendChild(tasksListHeader);

    const tasksListInput = document.createElement('li');
    tasksListInput.innerHTML = '<form action="" class="tasks-list-form row"><input type="text" placeholder="Add to your list..."> <button type="submit"><i class="fas fa-level-down-alt"></i></button></form>';
    tasksList.appendChild(tasksListInput);

    this.Tasks.forEach((task) => {
      const taskRow = document.createElement('li');
      taskRow.className = 'task-row row';
      taskRow.innerHTML = `<div class="task-info"> <input type="checkbox"> <label>${task.description}</label> </div> <i class="fa fa-ellipsis-v"></i>`;

      tasksList.appendChild(taskRow);
    });

    const clearCompletedRow = document.createElement('div');
    clearCompletedRow.className = 'clear-completed-row row';
    clearCompletedRow.innerHTML = '<button class="clear-completed-button">Clear all completed</button>';
    tasksList.appendChild(clearCompletedRow);

    const taskListForm = document.querySelector('.tasks-list-form');
    taskListForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const addTaskInput = document.querySelector('.tasks-list-form input').value;
      this.addTask(addTaskInput);
    });
  }

  // eslint-disable-next-line import/prefer-default-export
}