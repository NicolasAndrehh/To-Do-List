import Task from './taksClass.js';
import {
  checkboxValidation, getLocalStorage, setLocalStorage,
} from './interactiveFunctions.js';

export default class TaskList {
  constructor() {
    this.Tasks = [];
  }

  addTask(task) {
    this.Tasks.push(new Task(task, undefined, this.Tasks.length));
    setLocalStorage('taskList', this.Tasks);

    this.showListElements();
    checkboxValidation(this.Tasks);
  }

  deleteTask(ids) {
    let tasksBackUp = this.Tasks;
    ids.forEach((id) => {
      this.Tasks = this.Tasks.filter((task) => task.index !== id);
      tasksBackUp = this.Tasks;
    });

    const checkboxStatus = [];
    this.Tasks = [];
    tasksBackUp.forEach((task) => {
      this.Tasks.push(new Task(task.description, task.completed, this.Tasks.length));
      checkboxStatus.push(task.completed);
    });

    // Set local storage
    setLocalStorage('taskList', this.Tasks);
    setLocalStorage('checkboxStatus', checkboxStatus);

    this.showListElements();
  }

  createListElements() {
    // Create task list header
    const tasksList = document.querySelector('.tasks-list');
    const tasksListHeader = document.createElement('div');
    tasksList.innerHTML = '';
    tasksListHeader.className = 'tasks-list-header row';
    tasksListHeader.innerHTML = '<h3>Today\'s To Do</h3> <i class="fa-solid fa-rotate"></i>';
    tasksList.appendChild(tasksListHeader);

    // Create task list form
    const tasksListInput = document.createElement('li');
    tasksListInput.innerHTML = '<form action="" class="tasks-list-form row"><input type="text" placeholder="Add to your list..." required> <button type="submit"><i class="fas fa-level-down-alt"></i></button></form>';
    tasksList.appendChild(tasksListInput);

    // Create task rows
    let checkboxStatus;
    if (getLocalStorage('checkboxStatus')) {
      checkboxStatus = getLocalStorage('checkboxStatus');
    }
    this.Tasks.forEach((task) => {
      // Setting localstorage to display correctly the checkboxes and icons
      if (getLocalStorage('checkboxStatus')) task.completed = checkboxStatus[task.index];

      const taskRow = document.createElement('li');
      taskRow.className = 'task-row row';
      taskRow.id = task.index;

      // Using checkboxStatus to set the dynamic HTML content
      let checkboxInput = '';
      let taskDescription = '';
      let icons = '';
      if (checkboxStatus && checkboxStatus[task.index]) {
        checkboxInput = '<input type="checkbox" checked>';
        taskDescription = `<label class='completed-task-text'>${task.description}</label>`;
        icons = '<i class="fa fa-ellipsis-v hide"></i> <i class="fa-solid fa-trash"></i>';
      } else {
        checkboxInput = '<input type="checkbox">';
        taskDescription = `<label>${task.description}</label>`;
        icons = '<i class="fa fa-ellipsis-v"></i> <i class="fa-solid fa-trash hide"></i>';
      }

      taskRow.innerHTML = `<div class="task-info"> ${checkboxInput} ${taskDescription} <input type="text" class="edit-description hide"> </div> ${icons}`;

      tasksList.appendChild(taskRow);
    });

    // Create clear completed row
    const clearCompletedRow = document.createElement('div');
    clearCompletedRow.className = 'clear-completed-row row';
    clearCompletedRow.innerHTML = '<button class="clear-completed-button">Clear all completed</button>';
    tasksList.appendChild(clearCompletedRow);
  }

  createEventListeners() {
    // Trash icons event listener
    const trashIcons = document.querySelectorAll('.fa-trash');
    trashIcons.forEach((icon) => {
      const taskRow = icon.parentNode;
      icon.addEventListener('click', () => {
        this.deleteTask([Number(taskRow.id)]);
      });
    });

    // Checkboxes event listerner
    let completedTasks = checkboxValidation(this.Tasks);

    // Form event listener
    const taskListForm = document.querySelector('.tasks-list-form');
    taskListForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const addTaskInput = document.querySelector('.tasks-list-form input').value;
      this.addTask(addTaskInput);
    });

    // Clear completed tasks event listener
    const clearCompletedButton = document.querySelector('.clear-completed-button');
    clearCompletedButton.addEventListener('click', () => {
      completedTasks = checkboxValidation(this.Tasks);
      this.deleteTask(completedTasks);
    });

    // Toggle edit description
    const taskDescriptions = document.querySelectorAll('.task-info label');
    taskDescriptions.forEach((description) => {
      const taskInfo = description.parentNode;
      const taskRow = taskInfo.parentNode;
      const taskId = Number(taskRow.id);
      const taskDescriptionInput = taskInfo.querySelector('.edit-description');

      // Description event listener
      description.addEventListener('click', () => {
        // Input event listener
        taskDescriptionInput.addEventListener('focusout', () => {
          description.classList.remove('hide');
          taskDescriptionInput.classList.add('hide');
          this.showListElements();
        });

        taskDescriptionInput.addEventListener('keyup', () => {
          this.Tasks[taskId].description = taskDescriptionInput.value;
          setLocalStorage('taskList', this.Tasks);
        });

        description.classList.add('hide');
        taskDescriptionInput.classList.remove('hide');
        taskDescriptionInput.focus();
      });
    });
  }

  showListElements() {
    this.createListElements();
    this.createEventListeners();
  }
}