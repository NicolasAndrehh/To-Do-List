function setLocalStorage(storageName, storageItem) {
  localStorage.setItem(storageName, JSON.stringify(storageItem));
}

function getLocalStorage(storageName) {
  return JSON.parse(localStorage.getItem(storageName));
}

function checkboxValidation(taskList) {
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
        taskList[Number(taskRow.id)].completed = true;
        console.log(taskList[Number(taskRow.id)]);
        setLocalStorage('taskList', taskList);
        taskList.forEach((task) => {
          checkboxStatus.push(task.completed);
        });
        setLocalStorage('checkboxStatus', checkboxStatus);
      } else {
        // Show ellipsis icon and remove task from completed tasks array
        ellipsisIcon.classList.remove('hide');
        trashIcon.classList.add('hide');
        taskDescription.classList.remove('completed-task-text');
        completedTasks = completedTasks.filter((id) => Number(taskRow.id) !== id);

        // Set checkbox status false
        taskList[Number(taskRow.id)].completed = false;
        console.log(taskList[Number(taskRow.id)]);
        setLocalStorage('taskList', taskList);
        taskList.forEach((task) => {
          checkboxStatus.push(task.completed);
        });
        setLocalStorage('checkboxStatus', checkboxStatus);
      }
    });
  });
  return completedTasks;
}

// eslint-disable-next-line import/prefer-default-export
export {
  checkboxValidation, setLocalStorage, getLocalStorage,
};