//UI variables
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');


//Load all event listeners
loadEventListeners();

function loadEventListeners() {
  //Load tasks from Local Storage
  document.addEventListener('DOMContentLoaded', getTasks);
  //Add task event
  form.addEventListener('submit', addTask);
  //Remove task event
  taskList.addEventListener('click', removeTask);
  //Clear all task events
  clearBtn.addEventListener('click', clearTasks);
  //Filter task events
  filter.addEventListener('keyup', filterTasks);
}

//Load tasks from LS
function getTasks() {
  let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach(task => {
    createNewLi(task);
  })
}

//Add taks
function addTask(e) {

  if (taskInput.value === '') {
    alert('Add a task');
    return;
  }
  //Create li element for new task
  createNewLi(taskInput.value);

  //Store task in Local Storage
  storeTaskInLS(taskInput.value);

  taskInput.value = '';

  e.preventDefault();
}

//Create li element for new task
function createNewLi(task) {
  const li = document.createElement('li');
  li.className = 'collection-item';
  li.appendChild(document.createTextNode(task));

  //Create new link element
  const link = document.createElement('a');
  link.className = 'delete-item secondary-content';
  link.innerHTML = '<i class="fas fa-times-circle"></i>';

  //Append lint to li
  li.appendChild(link);

  //Append li to ul
  taskList.appendChild(li);
}

//Store task in Local Storage
function storeTaskInLS(task) {
  let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.push(task);

  localStorage.setItem('tasks', JSON.stringify(tasks));
}

//Remove task
function removeTask(e) {
  if (e.target.parentElement.classList.contains('delete-item')) {
    if (confirm('Are You Sure?')) {
      e.target.parentElement.parentElement.remove();

      //Remove task from LS
      removeTaskFromLS(e.target.parentElement.parentElement);
    }
  }
}

//Remove taask from LS
function removeTaskFromLS(taskItem) {
  let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach((task, index) => {
    if (taskItem.textContent === task) {
      tasks.splice(index, 1);
    }
  });

  localStorage.setItem('tasks', JSON.stringify(tasks));
}

//Clear all tasks
function clearTasks(e) {
  while (taskList.firstChild) {
    taskList.removeChild(taskList.firstChild);
  }

  //Clear all tasks from LS
  clearTasksFromLS()
}

//Clear all tasks from LS
function clearTasksFromLS() {
  localStorage.removeItem('tasks');
}

//Filter tasks
function filterTasks(e) {
  const text = e.target.value.toLowerCase();

  taskList.querySelectorAll('.collection-item').forEach(task => {
    const item = task.firstChild.textContent.toLowerCase();
    if (item.indexOf(text) !== -1) {
      task.style.display = 'block';
    } else {
      task.style.display = 'none';
    }
  })
}