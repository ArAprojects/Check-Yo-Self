class Todolist{
  constructor(id, title, tasks, urgent){
    this.id = id;
    this.title = title;
    this.tasks = tasks || []
    this.urgent = urgent || false;
  }

  saveToLocalStorage(){
    var stringified = JSON.stringify(toDoListArray)
    localStorage.setItem('tasklist', stringified)
  }

}
