import TaskList from './modules/taskListClass.js';
import './style.scss';

const tasksArray = new TaskList();
tasksArray.addTask('Going to gym');
tasksArray.addTask('Attend to morning session');
tasksArray.addTask('Lunch Break');

document.addEventListener('DOMContentLoaded', tasksArray.showListElements());
