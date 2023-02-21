// import _ from 'lodash';
import './style.scss';

const tasksArray = [
  {
    description: 'Going to the gym 0',
    completed: false,
    index: 0,
  },
  {
    description: 'Going to the gym 1',
    completed: false,
    index: 1,
  },
  {
    description: 'Going to the gym 2',
    completed: false,
    index: 2,
  },
  {
    description: 'Going to the gym 3',
    completed: false,
    index: 3,
  },
];

const tasksList = document.querySelector('.tasks-list');

function listElements() {
  const tasksListHeader = document.createElement('div');
  tasksListHeader.className = 'tasks-list-header row';
  tasksListHeader.innerHTML = '<h3>Today\'s To Do</h3>';
  tasksList.appendChild(tasksListHeader);

  const tasksListInput = document.createElement('div');
  tasksListInput.className = 'tasks-list-input row';
  tasksListInput.innerHTML = '<input type="text" placeholder="Add to your list...">';
  tasksList.appendChild(tasksListInput);

  tasksArray.forEach((task) => {
    const taskRow = document.createElement('li');
    taskRow.className = 'task-row row';
    taskRow.innerHTML = `<div> <input type="checkbox"> <p>${task.description}</p> </div> <i class="fa-regular fa-ellipsis-vertical"></i>`;

    tasksList.appendChild(taskRow);
  });

  const clearCompletedRow = document.createElement('div');
  clearCompletedRow.className = 'clear-completed-row row';
  clearCompletedRow.innerHTML = '<button class="clear-completed-button">Clear all completed</button>';
  tasksList.appendChild(clearCompletedRow);
}

document.addEventListener('DOMContentLoaded', listElements());
// document.body.appendChild(component());