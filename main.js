var newItemButton = document.querySelector('.new-item-button')
var leftCheckList = document.querySelector(".checklist")
var taskTitleInput = document.querySelector('.to-do-title-input')
var taskBodyInput = document.querySelector('.to-do-item-input')
var makeTaskListButton = document.querySelector('.make-task-list-button')
var cardArea = document.querySelector('.section-right')
var listArea = document.querySelector('.section-left')
var clearAllButton = document.querySelector('.clear-all-button')
var deleteButton = document.querySelector('.delete-from-sidebar-button')
// var listItem = document.querySelector('.listItem')

// -----------Event-listeners--------------//
newItemButton.addEventListener('click', addNewListItem)
taskBodyInput.addEventListener('keyup', checkTaskBodyInput)
newItemButton.addEventListener('click', checkTaskTitleInput)
taskTitleInput.addEventListener('keyup', checkTaskTitleInput)
newItemButton.addEventListener('click', checkTaskList)
newItemButton.addEventListener('click', resetInputs)
leftCheckList.addEventListener('click', deleteListItem)
clearAllButton.addEventListener('click', clearAll)
makeTaskListButton.addEventListener('click', makeCard)
leftCheckList.addEventListener('click', checkTaskTitleInput)
clearAllButton.addEventListener('click', checkTaskList)
clearAllButton.addEventListener('click', checkTaskTitleInput)
clearAllButton.addEventListener('click', checkTaskBodyInput)
newItemButton.addEventListener('click', checkTaskBodyInput)

// clearAllButton.addEventListener('click', )


function addNewListItem(e) {
  e.preventDefault()
  leftCheckList.innerHTML = `
  <li class="list-item"><img class="delete-from-sidebar-button" src="assets/delete.svg">${taskBodyInput.value}</li>`
  + leftCheckList.innerHTML;
}

function makeCard(e) {
  e.preventDefault()
  cardArea.innerHTML = `
  <article class="card">
    <div class="card-title">
    <h2>${taskTitleInput.value}</h2>
    <hr>
    </div>
    <div class="card-body">
    <p>${leftCheckList.innerHTML}</p>
    </div>
    <hr>
    <div class="card-footer">
      <section class="urgent-section" action="index.html" method="post">
        <img class="urgent-button" src="assets/urgent.svg">
        <p>Urgent</p>
      </section>
      <section class="delete-section" action="index.html" method="post">
        <img class="delete-button" src="assets/urgent.svg">
        <p>Delete</p>
      </section>
    </article>
 `
  + cardArea.innerHTML;
}

// ------------validating--inputs-----------//
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
    console.log(leftCheckList.innerHTML + "hi")
  } else {
    console.log(leftCheckList.innerHTML.length + "no")
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
