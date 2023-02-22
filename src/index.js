import TaskList from './modules/taskListClass.js';
import './style.scss';

const tasksArray = new TaskList();

// Set local storage values
if (localStorage.getItem('taskList')) {
  tasksArray.Tasks = JSON.parse(localStorage.getItem('taskList'));
} else {
  tasksArray.addTask('Going to gym');
  tasksArray.addTask('Attend to morning session');
  tasksArray.addTask('Lunch Break');
}

document.addEventListener('DOMContentLoaded', tasksArray.showListElements());
