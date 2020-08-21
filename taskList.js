import Task from "./task.js";
// Set Class for Task List
// Declare empty array to hold books
// Declare Id so that a function can be created in order to increment
export default class TaskList {
  constructor() {
    this.tasks = [];
    this.currentId = parseInt(localStorage.getItem("currentId")) || 1;
    localStorage.setItem("currentId", this.currentId);
  }

  // END: SET CLASSES FOR TASKS & TASKLIST //

  // START: CREATE NEW TASK //
  // This function uses the above framework (class) to get details of each task, create the task & get ready for the array
  addTask(taskName, assignee, status, description, dueDate = "") {
    // "new" is a keyword to instruct it to create a new task using "Task" class
    // alert(`${taskName}, ${assignee}, ${status}, ${description}, ${dueDate}`);
    const task = new Task(
      this.currentId++, // instructs it to add 1 to the Id to get a unique Id for this task getting newly created
      taskName,
      assignee,
      status,
      description,
      dueDate
    );
    // alert("here");
    // creates an instance of class
    this.tasks.push(task); // Invokes function and pushes the new object (task) into the array (tasks);

    //add to local storage
    localStorage.setItem("currentId", this.currentId);
    let mynewtasks = JSON.parse(localStorage.getItem("mytasks")) || [];
    mynewtasks.push(task);
    localStorage.setItem("mytasks", JSON.stringify(mynewtasks));
  }

  //Update function in the class
  updateTask(id, name, assignee, status, description, date) {
    // alert("in class update");
    let updated_id = "";
    for (let i = 0; i < this.tasks.length; i++) {
      if (this.tasks[i].id == id) {
        // alert("update if");
        this.tasks[i].taskName = name;
        this.tasks[i].assignee = assignee;
        this.tasks[i].status = status;
        this.tasks[i].description = description;
        this.tasks[i].dueDate = date;
        updated_id = id;
      }
    }
    let mynewtasks = JSON.parse(localStorage.getItem("mytasks"));

    for (let i = 0; i < mynewtasks.length; i++) {
      if (mynewtasks[i].id == id) {
        //update in local storage
        mynewtasks[i].taskName = name;
        mynewtasks[i].description = description;
        mynewtasks[i].assignee = assignee;
        mynewtasks[i].status = status;
        mynewtasks[i].dueDate = date;
        localStorage.setItem("mytasks", JSON.stringify(mynewtasks));
        // alert("edit local");
        break;
      }
    }
    return updated_id;
  }

  deleteTask(id) {
    for (let i = 0; i < this.tasks.length; i++) {
      if (this.tasks[i].id == id) {
        this.tasks.splice(i, 1);
        break;
      }
    }
    //local storage
    let mynewtasks = JSON.parse(localStorage.getItem("mytasks"));
    for (let i = 0; i < mynewtasks.length; i++) {
      if (mynewtasks[i].id == id) {
        // delete from local storage
        mynewtasks.splice(i, 1);
        localStorage.setItem("mytasks", JSON.stringify(mynewtasks));
        break;
      }
    }
  }

  // Keyword 'displayXXX' to create function
  displayTask() {
    // Use for loop to run through the array
    for (let i = 0; i < this.tasks.length; i++) {
      // "i" doesn't mean anything, it is just good practise for the variable name in a for loop. Arrays all start at 0 (even though we think of it as book "1").
      // It finishes the loop when gets to the end of the objects held in the array, ie. end of the tasks. And tasks can keep getting added and this loop will run until it goes through all tasks because of the length parameter (this.tasks.length)
      //if you add .xxx, Eg.(this.tasks[i].taskName) it would return all the task names of the task list
    }
    // Test: console.log(this.tasks[i]);
  }
}
