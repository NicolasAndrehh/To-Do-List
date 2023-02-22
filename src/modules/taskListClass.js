import Task from './taksClass';

export default class TaskList {
  constructor() {
    this.Tasks = [];
  }

  addTask(task) {
    this.Tasks.push(new Task(task, this.Tasks.length));
    localStorage.setItem('taskList', JSON.stringify(this.Tasks));
    this.showListElements();
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
      this.Tasks.push(new Task(task.description, this.Tasks.length));
      checkboxStatus.push(task.completed);
    });

    // Set local storage
    localStorage.setItem('taskList', JSON.stringify(this.Tasks));
    localStorage.setItem('checkboxStatus', JSON.stringify(checkboxStatus));

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
    if (localStorage.getItem('checkboxStatus')) {
      checkboxStatus = JSON.parse(localStorage.getItem('checkboxStatus'));
    }
    this.Tasks.forEach((task) => {
      // Setting localstorage to display correctly the checkboxes and icons
      if (localStorage.getItem('checkboxStatus')) task.completed = checkboxStatus[task.index];

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
    const checkboxInputs = document.querySelectorAll('input[type="checkbox"]');
    let completedTasks = [];

    // Setting local storage completed tasks if exist
    if (localStorage.getItem('checkboxStatus')) {
      const checkboxStatus = JSON.parse(localStorage.getItem('checkboxStatus'));

      for (let index = 0; index < checkboxStatus.length; index += 1) {
        if (checkboxStatus[index] === true) completedTasks.push(index);
      }
    }
    checkboxInputs.forEach((checkboxInput) => {
      checkboxInput.addEventListener('change', () => {
        const taskRow = checkboxInput.parentNode.parentNode;
        const ellipsisIcon = taskRow.querySelector('.fa-ellipsis-v');
        const trashIcon = taskRow.querySelector('.fa-trash');
        const taskDescription = taskRow.querySelector('.task-info label');

        const checkboxStatus = [];
        if (checkboxInput.checked) {
          // Show trash icon and add task to completed tasks array
          ellipsisIcon.classList.add('hide');
          trashIcon.classList.remove('hide');
          taskDescription.classList.add('completed-task-text');
          completedTasks.push(Number(taskRow.id));

          // Set checkbox status true
          this.Tasks[Number(taskRow.id)].completed = true;
          this.Tasks.forEach((task) => {
            checkboxStatus.push(task.completed);
          });
          localStorage.setItem('checkboxStatus', JSON.stringify(checkboxStatus));
        } else {
          // Show ellipsis icon and remove task from completed tasks array
          ellipsisIcon.classList.remove('hide');
          trashIcon.classList.add('hide');
          taskDescription.classList.remove('completed-task-text');
          completedTasks = completedTasks.filter((id) => Number(taskRow.id) !== id);

          // Set checkbox status false
          this.Tasks[Number(taskRow.id)].completed = false;
          this.Tasks.forEach((task) => {
            checkboxStatus.push(task.completed);
          });
          localStorage.setItem('checkboxStatus', JSON.stringify(checkboxStatus));
        }

        // Set checkbox status on localstorage
      });
    });

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