var newItemButton = document.querySelector('.new-item-button')
var leftCheckList = document.querySelector(".checklist")
var taskTitleInput = document.querySelector('.to-do-title-input')
var taskBodyInput = document.querySelector('.to-do-item-input')
// -----------Event-listeners--------------//

newItemButton.addEventListener('click', addNewListItem)
newItemButton.addEventListener('click', resetInputs)


function addNewListItem() {
leftCheckList.innerHTML = `
  <li class="list-item"><img class="delete-from-sidebar-button" src="assets/delete.svg">${taskBodyInput.value}</li>`
  + leftCheckList.innerHTML;
}

function resetInputs(){
  taskTitleInput.value = ''
  taskBodyInput.value = ''
}
