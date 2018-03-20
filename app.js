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
  form.addEventListener('submit', adTask);
}

//Add taks
function adTask(e) {
  
  if(taskInput.value === '') {
    alert('Add a task');
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
  
  
  e.preventDefault;


}