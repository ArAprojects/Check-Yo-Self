var newItemButton = document.querySelector('.new-item-button')
var leftCheckList = document.querySelector(".checklist")
var taskTitleInput = document.querySelector('.to-do-title-input')
var taskBodyInput = document.querySelector('.to-do-item-input')
var makeTaskListButton = document.querySelector('.make-task-list-button')
var cardArea = document.querySelector('.section-right')
var listArea = document.querySelector('.section-left')
var clearAllButton = document.querySelector('.clear-all-button')
var deleteButton = document.querySelector('.delete-from-sidebar-button')
var deleteSection = document.querySelector('.delete-section')
var urgentSection = document.querySelector('.urgent-section')
var listItem = document.querySelector('.list-item')
var toDoListArray = JSON.parse(localStorage.getItem('tasklist')) || [];
var taskArray = []

// -----------Event-listeners--------------//
newItemButton.addEventListener('click', addNewListItem)
taskBodyInput.addEventListener('keyup', checkTaskBodyInput)
taskTitleInput.addEventListener('keyup', checkTaskTitleInput)
makeTaskListButton.addEventListener('click', makeNewTask)
listArea.addEventListener('click', listAreaClicks)
cardArea.addEventListener('click', deleteCard)
newItemButton.addEventListener('click', makeNewTaskObject)
makeTaskListButton.addEventListener('click', clearArray)
newItemButton.addEventListener('click', getTasks)
newItemButton.addEventListener('click', resetInputs)
clearAllButton.addEventListener('click', clearAll)
// makeTaskListButton.addEventListener('click', svgSwap)
// cardArea.addEventListener('click', makeUrgent)



function getTasks(storage) {
  console.log(taskArray)
  if(taskArray.length > 0) {
    console.log('we in it')
  var toDoString = '';
  console.log('here', taskArray)
  console.log(storage)
  for (var i = 0; i < storage.length; i++) {
    console.log(storage[i])
    toDoString += `
      <li class="list-item" data-id=${storage[i].id} id=${storage[i].id}>
        <input type='image' class='card--check--icon' src='assets/checkbox.svg' alt='checkbox' data-id=${storage[i].id} id ='index [i]'/>
        <p class='typed-to-do' id=${storage[i].id}>${storage[i].content}</p>
      </li>`
  }
  return toDoString;
}
}


function addNewListItem(id) {
  leftCheckList.innerHTML = `
  <li class="list-item"><img class="delete-from-sidebar-button" src="assets/delete.svg">${taskBodyInput.value}</li>`
  + leftCheckList.innerHTML;
}

function makeCard(object) {
  console.log('object here', object)
  console.log('object content', object.tasks)
  cardArea.innerHTML = `
  <article class="card">
    <div class="card-title">
    <h2>${object.title}</h2>
    <hr>
    </div>
    <div class="card-body">
    <ul class="checklist">${getTasks(object.tasks)}</ul>
    </div>
    <hr>
    <div class="card-footer">
      <section class="urgent-section" action="index.html" method="post">
        <img class="urgent-button" src="assets/urgent.svg">
        <p>Urgent</p>
      </section>
      <section class="delete-section" action="index.html" method="post">
        <img class="delete-button" src="assets/delete.svg">
        <p>Delete</p>
      </section>
    </article>
 `
  + cardArea.innerHTML;
    leftCheckList.innerHTML = '';
    taskTitleInput.value = '';
}



// ------------validating--inputs-----------//

function listAreaClicks(e){
  e.preventDefault()
  deleteListItem(e);
  checkTaskList();
  checkTaskBodyInput();
  checkTaskTitleInput();
}

function resetInputs() {
  taskBodyInput.value = ''
}

function clearAll(){
  leftCheckList.innerHTML = ''
  taskTitleInput.value = ''
  taskBodyInput.value = ''
}

function checkTaskBodyInput() {
  if (taskBodyInput.value === '') {
    newItemButton.disabled = true;
  } else {
    newItemButton.disabled = false;
  }
}

function checkTaskTitleInput() {
  if (leftCheckList.innerText === '' || taskTitleInput.value === '') {
    makeTaskListButton.disabled = true;
  } else {
    makeTaskListButton.disabled = false;
  }
}

function checkTaskList() {
  if (leftCheckList.innerText != '' || taskBodyInput.value != '' || taskTitleInput.value != '') {
    clearAllButton.disabled = false;
  } else {
    clearAllButton.disabled = true;
  }
}

function clearArray(){
  taskArray = []
}

// --------------deleteing-----------//
  function deleteListItem(e){
  if (e.target.className === "delete-from-sidebar-button") {
      e.target.closest(".list-item").remove();
  }
}

function deleteCard(e){
  if (e.target.className === "delete-button") {
    e.target.closest(".card").remove()
  }
}


//-----------------------------------------------------
function makeNewTask() {
    console.log('wow so cool')
	var newTaskList = new Todolist(Date.now(), taskTitleInput.value, taskArray);
  makeCard(newTaskList);
	toDoListArray.push(newTaskList);
	newTaskList.saveToLocalStorage();
}

function makeNewTaskObject() {
  var listItem = document.querySelector('.list-item')
  var taskObject = { id: Date.now(), content: `${taskBodyInput.value}`, checked: false}
  console.log(taskObject)
  taskArray.push(taskObject)

}


// function svgSwap() {
// var deleteButton = document.querySelectorAll('.delete-from-sidebar-button')
// for (var i = 0; i < deleteButton.length; i++){
//   if (deleteButton[i].getAttribute('src') === 'assets/delete.svg') {
//       deleteButton[i].setAttribute('src', 'assets/checkbox.svg')
//     }
//   }
// }
