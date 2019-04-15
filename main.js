var newItemButton = document.querySelector('.new-item-button')
var leftCheckList = document.querySelector(".checklist")
var taskTitleInput = document.querySelector('.to-do-title-input')
var taskBodyInput = document.querySelector('.to-do-item-input')
var makeTaskListButton = document.querySelector('.make-task-list-button')
var cardArea = document.querySelector('section-right')
var clearAllButton = document.querySelector('clear-all-button')
// -----------Event-listeners--------------//

newItemButton.addEventListener('click', addNewListItem)
taskBodyInput.addEventListener('keyup', checkTaskBodyInput)
newItemButton.addEventListener('click', checkTaskBodyInput)
makeTaskListButton.addEventListener('click', checkTaskTitleInput)
taskTitleInput.addEventListener('keyup', checkTaskTitleInput)
newItemButton.addEventListener('click', resetInputs)


function addNewListItem(e) {
  e.preventDefault()
  leftCheckList.innerHTML = `
  <li class="list-item"><img class="delete-from-sidebar-button" src="assets/delete.svg">${taskBodyInput.value}</li>`
  + leftCheckList.innerHTML;
}

function makeCard(e) {
  e.preventDefault()
  cardArea.innerHTML = `
  <li class="list-item"><img class="delete-from-sidebar-button" src="assets/delete.svg">${taskBodyInput.value}</li>`
  + cardArea.innerHTML;
}

function resetInputs(){
  taskTitleInput.value = ''
  taskBodyInput.value = ''
}

function checkTaskBodyInput() {
  if (taskBodyInput.value === "") {
    newItemButton.disabled = true;
  } else {
    newItemButton.disabled = false;
  }
}

function checkTaskTitleInput() {
  if (taskTitleInput.value === "") {
    makeTaskListButton.disabled = true;
  } else {
    makeTaskListButton.disabled = false;
  }
}

function checkTaskList() {
  if (leftCheckList.innerHTML === "") {
    clearAllButton.disabled = true;
  } else {
    clearAllButton.disabled = false;
  }
}
