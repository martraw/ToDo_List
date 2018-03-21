//UI variables
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');


//Load all event listeners
loadEventListeners();

function loadEventListeners() {
  //Add task event
  form.addEventListener('submit', addTask);
  //Remove task event
  taskList.addEventListener('click', removeTask);
  //Clear all task events
  clearBtn.addEventListener('click', clearTasks);
  //Filter task events
  filter.addEventListener('keyup', filterTasks);
}

//Add taks
function addTask(e) {
  
  if(taskInput.value === '') {
    alert('Add a task');
    return;
  } 
  
  //Create new li element
  const li = document.createElement('li');
  li.className = 'collection-item';
  li.appendChild(document.createTextNode(taskInput.value));
  
  //Create new link element
  const link = document.createElement('a');
  link.className = 'delete-item secondary-content'
  link.innerHTML = '<i class="fas fa-times-circle"></i>'
  
  //Append lint to li
  li.appendChild(link);
  
  //Append li to ul
  taskList.appendChild(li);
  
  taskInput.value = '';
  
  e.preventDefault();
}

//Remove task
function removeTask(e) {
  if (e.target.parentElement.classList.contains('delete-item')) {
   if (confirm('Are You Sure?')) {
     e.target.parentElement.parentElement.remove();
   }
  }
}

//Clear all tasks
function clearTasks(e) {
  while (taskList.firstChild) {
    taskList.removeChild(taskList.firstChild);
  }
}

//Filter tasks
function filterTasks(e) {
  const text = e.target.value.toLowerCase();
  
  taskList.querySelectorAll('.collection-item').forEach(task => {
    const item = task.firstChild.textContent;
    if (item.toLowerCase().indexOf(text) !== -1) {
      task.style.display = 'block';
    } else {
      task.style.display = 'none';
    }
  })
}