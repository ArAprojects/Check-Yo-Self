var toDoListArray = JSON.parse(localStorage.getItem('tasklist')) || [];
var taskArray = [];
var cardArrayIndx = 0;
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
var unchecked = document.querySelector('.task-check')


newItemButton.addEventListener('click', addNewListItem)
taskBodyInput.addEventListener('keyup', checkTaskBodyInput)
taskTitleInput.addEventListener('keyup', checkTaskTitleInput)
makeTaskListButton.addEventListener('click', makeNewTask)
listArea.addEventListener('click', listAreaClicks)
cardArea.addEventListener('click', deleteCard)
newItemButton.addEventListener('click', makeNewTaskObject)
newItemButton.addEventListener('click', getTasks)
newItemButton.addEventListener('click', resetInputs)
clearAllButton.addEventListener('click', clearAll)
cardArea.addEventListener('click', toggles)
cardArea.addEventListener('click', toggleCheck)
window.addEventListener('load', reload)


function reload() {
  if(localStorage.getItem('tasklist')) {
    var getCardArray = localStorage.getItem('tasklist');
    toDoListArray.forEach(function(el) {
    makeCard(el);
    });
  }
}

function getTasks(task) {
  if(task.length > 0) {
    var toDoString = '';
    for (var i = 0; i < task.length; i++) {
      toDoString += `
        <li class="list-item" data-id=${task[i].id} id=${task[i].id}>
          <input type='image' class='task-check' src='assets/checkbox.svg' alt='checkbox' data-id=${task[i].id} id ='index [i]'/>
          <p class='task-text' id=${task[i].id}>${task[i].content}</p>
        </li>`
    }
    return toDoString;
  }
}

function addNewListItem() {
  leftCheckList.innerHTML = `
  <li class="list-item"><img class="delete-from-sidebar-button" src="assets/delete.svg">${taskBodyInput.value}</li>`
  + leftCheckList.innerHTML;
}

function makeCard(object) {
  cardArea.innerHTML = `
  <article class="card" data-id="${object.id}">
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
        <p>URGENT</p>
      </section>
      <section class="delete-section" action="index.html" method="post">
        <img class="delete-button" src="assets/delete.svg">
        <p>DELETE</p>
      </section>
    </article>
 `
  + cardArea.innerHTML;
    leftCheckList.innerHTML = '';
    taskTitleInput.value = '';
}


function listAreaClicks(e){
  e.preventDefault()
  deleteListItem(e);
  checkTaskList();
  checkTaskBodyInput();
  checkTaskTitleInput();
}

function toggles(e){
  toggleUrgent(e)
  toggleColor(e)
}

function toggleCheck(e){
  e.target.closest(".task-check").getAttribute('src') === 'assets/checkbox.svg' ?
  e.target.closest(".task-check").setAttribute('src', 'assets/checkbox-active.svg') :
  e.target.closest(".task-check").setAttribute('src', 'assets/checkbox.svg')
}

function toggleUrgent(e){
  e.target.closest(".urgent-button").getAttribute('src') === 'assets/urgent.svg' ?
  e.target.closest(".urgent-button").setAttribute('src', 'assets/urgent-active.svg') :
  e.target.closest(".urgent-button").setAttribute('src', 'assets/urgent.svg')
}

function toggleColor(e){
  e.target.closest(".urgent-button").getAttribute('src') === 'assets/urgent-active.svg' ?
  e.target.closest(".card").setAttribute('class', 'yellow-card') :
  e.target.closest(".yellow-card").setAttribute('class', 'card')
}

cardArea.addEventListener('mouseover', e => {
  if(e.target.classList.contains('delete-button')) {
  e.target.closest(".delete-button").setAttribute('src', 'assets/delete-active.svg');
  }
});

cardArea.addEventListener('mouseout', e => {
  if(e.target.classList.contains('delete-button')) {
  e.target.closest(".delete-button").setAttribute('src', 'assets/delete.svg');
  }
});

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

function deleteListItem(e){
  if (e.target.className === "delete-from-sidebar-button") {
      e.target.closest(".list-item").remove();
  }
}
// function targetCardForDeletion(e) {
//   var card = e.target.closest('.card');
//   var index = findCardIndex(card);
// }

// function findCardIndex(card) {
//   var cardId = card.dataset.id;
//   return todoCards.findIndex(function(item) {
//     return item.id == cardId;
//   });
// }

function deleteCard(e){
  if (e.target.className === "delete-button") {
    e.target.closest(".card").remove()
  }
}

function makeNewTask() {
	var newTaskList = new Todolist(Date.now(), taskTitleInput.value, taskArray);
  makeCard(newTaskList);
	toDoListArray.push(newTaskList);
	newTaskList.saveToLocalStorage();
  taskArray = [];
}

function makeNewTaskObject() {
  var listItem = document.querySelector('.list-item')
  var taskObject = { id: Date.now(), content: `${taskBodyInput.value}`, checked: false}
  taskArray.push(taskObject)
}
