// import _ from 'lodash';
import './style.scss';

const tasksArray = [
  {
    description: 'Going to the gym',
    completed: false,
    index: 0,
  },
  {
    description: 'Attend to morning session',
    completed: false,
    index: 1,
  },
  {
    description: 'Program time',
    completed: false,
    index: 2,
  },
  {
    description: 'Lunch break',
    completed: false,
    index: 3,
  },
];

const tasksList = document.querySelector('.tasks-list');

function listElements() {
  const tasksListHeader = document.createElement('div');
  tasksListHeader.className = 'tasks-list-header row';
  tasksListHeader.innerHTML = '<h3>Today\'s To Do</h3> <i class="fa-solid fa-rotate"></i>';
  tasksList.appendChild(tasksListHeader);

  const tasksListInput = document.createElement('li');
  tasksListInput.className = 'tasks-list-input row';
  tasksListInput.innerHTML = '<input type="text" placeholder="Add to your list..."> <i class="fas fa-level-down-alt"></i>';
  tasksList.appendChild(tasksListInput);

  tasksArray.forEach((task) => {
    const taskRow = document.createElement('li');
    taskRow.className = 'task-row row';
    taskRow.innerHTML = `<div class="task-info"> <input type="checkbox"> <label>${task.description}</label> </div> <i class="fa fa-ellipsis-v"></i>`;

    tasksList.appendChild(taskRow);
  });

  const clearCompletedRow = document.createElement('div');
  clearCompletedRow.className = 'clear-completed-row row';
  clearCompletedRow.innerHTML = '<button class="clear-completed-button">Clear all completed</button>';
  tasksList.appendChild(clearCompletedRow);
}

document.addEventListener('DOMContentLoaded', listElements());
// document.body.appendChild(component());