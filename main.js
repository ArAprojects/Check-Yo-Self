
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
var toDoListArray = JSON.parse(localStorage.getItem('tasklist')) || [];
var taskArray = [];
var cardArrayIndx = 0;

// -----------Event-listeners--------------//
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
cardArea.addEventListener('click', toggleCheck)
window.addEventListener('load', reload)
// makeTaskListButton.addEventListener('click', svgSwap)
// cardArea.addEventListener('click', makeUrgent)

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
  console.log('object here', object)
  console.log('object content', object.tasks)
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

function toggleCheck(e){
  e.target.closest(".task-check").getAttribute('src') === 'assets/checkbox.svg' ?
  e.target.closest(".task-check").setAttribute('src', 'assets/checkbox-active.svg') :
  e.target.closest(".task-check").setAttribute('src', 'assets/checkbox.svg')
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


// --------------deleteing-----------//
function deleteListItem(e){
  if (e.target.className === "delete-from-sidebar-button") {
      e.target.closest(".list-item").remove();
  }
}

function targetCardForDeletion(e) {
  var card = e.target.closest('.card');
  var index = findCardIndex(card);
}

function findCardIndex(card) {
  var cardId = card.dataset.id;
  return todoCards.findIndex(function(item) {
    return item.id == cardId;
  });
}

function deleteCard(e){
  if (e.target.className === "delete-button") {
    e.target.closest(".card").remove()
  }
}


function makeNewTask() {
    console.log('wow so cool')
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
