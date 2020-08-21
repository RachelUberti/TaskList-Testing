// START: SET CLASSES FOR TASKS & TASKLIST //

import TaskList from "./taskList.js";
import displayAllTasksFromStorage from "./display.js";

const taskList = new TaskList(); // Creates an instance of class BookList. Sets taskList as a variable and attaches it to a new function.
// test -->console.log(bookList.books);

// taskList.displayTask(); invoking the function of displaying contents of the array. taskList previously set as a variable that holds a function to create a new Task list.

// END: CREATE NEW TASK //

// START: ADD OBJECT TO ARRAY - adding a new task //
// Display tasks
// function addTaskToWebpage() {
//   let listOfCards = document.querySelector("#listOfCards");
//   const displayHtml = taskList.displayListHtml();
//   let range = document.createRange();
//   let documentFragment = range.createContextualFragment(displayHtml);
//   // attach delete event listener
//   documentFragment
//     .querySelector("button.delete")
//     .addEventListener("click", deleteTask);
//   documentFragment
//     .querySelector("button.edit")
//     .addEventListener("click", openEditModal);
//   listOfCards.appendChild(documentFragment);
// }
// END: ADD OBJECT TO ARRAY - adding a new task //

// START: DISPLAY TASKS FROM STORAGE ON WEB PAGE LOAD //
let listOfCards = document.querySelector("#listOfCards");
displayAllTasksFromStorage(listOfCards, openEditModal, deleteTask);

// END: DISPLAY TASKS FROM STORAGE ON WEB PAGE LOAD //

// START: EDIT TASK //

function openEditModal() {
  // alert("hello");
  const taskElement = event.target.closest(".edit"); // Searches for the delete button most recently clicked
  let editIdArr = taskElement.id.split("_");
  let retreiveId = editIdArr[1];
  // alert(retreiveId);
  document.querySelector("#editTaskId").value = retreiveId;
  var taskArr = JSON.parse(localStorage.getItem("mytasks")) || taskList.tasks;
  for (let i = 0; i <= taskArr.length; i++) {
    // alert("in for");
    if (taskArr[i].id == retreiveId) {
      // alert("in edit");
      document.querySelector("#editTaskName").value = taskArr[i].taskName;
      document.querySelector("#editTaskDescription").value =
        taskArr[i].description;
      document.querySelector("#editAssignee").value = taskArr[i].assignee;
      document.querySelector("#dueDate").value = taskArr[i].dueDate;
      break;
    }
  }
  $("#modalEdit").modal("show"); //function to show the Modal at Edit
}

// Validation for edit modal
let btnEditUpdate = document.querySelector("#btnEditUpdate");
let editTaskName = document.querySelector("#editTaskName");
let editTaskNameErrMsg = document.querySelector("#editTaskNameErrMsg");
let editAssignee = document.querySelector("#editAssignee");
let editTaskAssigneeErrMsg = document.querySelector("#editTaskAssigneeErrMsg");
let editTaskStatus = document.querySelector("#editTaskStatus");
let editTaskDescription = document.querySelector("#editTaskDescription");
let editTaskDescriptionErrMsg = document.querySelector(
  "#editTaskDescriptionErrMsg"
);
let editDueDate = document.querySelector("#editDueDate");

btnEditUpdate.onclick = function () {
  // alert("inside edit function");
  if (
    editTaskName.value == "" ||
    editTaskName.value.length < 8 ||
    editTaskDescription.value == "" ||
    editTaskDescription.value.length < 15 ||
    editAssignee.value == ""
  ) {
    // alert("inside edit if");
    editTaskNameErrMsg.innerHTML =
      "Please enter a task name longer than 8 characters";
    editTaskNameErrMsg.style.color = "#ff0000";
    editTaskName.style.borderColor = "#ff0000";
    editTaskAssigneeErrMsg.innerHTML = "Please enter an assignee";
    editTaskAssigneeErrMsg.style.color = "#ff0000";
    editAssignee.style.borderColor = "#ff0000";
    editTaskDescriptionErrMsg.innerHTML =
      "Please enter a description longer than 15 characters";
    editTaskDescriptionErrMsg.style.color = "#ff0000";
    editTaskDescription.style.borderColor = "#ff0000";
  } else {
    editTaskNameErrMsg.innerHTML = "Looks good!";
    editTaskNameErrMsg.style.color = "#66CDAA";
    editTaskName.style.borderColor = "#66CDAA";
    editTaskAssigneeErrMsg.innerHTML = "Looks good!";
    editTaskAssigneeErrMsg.style.color = "#66CDAA";
    editAssignee.style.borderColor = "#66CDAA";
    editTaskDescriptionErrMsg.innerHTML = "Looks good!";
    editTaskDescriptionErrMsg.style.color = "#66CDAA";
    editTaskDescription.style.borderColor = "#66CDAA";
    // return true;

    // alert("here edit task");
    //after edit validation
    let editTaskId = document.querySelector("#editTaskId");
    // alert("after edit task");
    let u_id = taskList.updateTask(
      editTaskId.value,
      editTaskName.value,
      editTaskDescription.value,
      editAssignee.value,
      editTaskStatus.value,
      editDueDate.value
    );
    $("#modalEdit").modal("hide"); // hides the modal once data filled out
    // displayUpdatedTask(u_id);
    displayAllTasksFromStorage(listOfCards, openEditModal, deleteTask);
  }
};

// Edit Task Name on change validation
editTaskName.onchange = function () {
  if (editTaskName.value == "" || editTaskName.value.length < 8) {
    editTaskNameErrMsg.innerHTML =
      "Please enter a task name longer than 8 characters";
    editTaskNameErrMsg.style.color = "#ff0000";
    editTaskName.style.borderColor = "#ff0000";
  } else {
    editTaskNameErrMsg.innerHTML = "Looks good!";
    editTaskNameErrMsg.style.color = "#66CDAA";
    editTaskName.style.borderColor = "#66CDAA";
  }
};

// Edit Assignee on change validation
editAssignee.onchange = function () {
  if (editAssignee.value == "") {
    editTaskAssigneeErrMsg.innerHTML = "Please enter an assignee";
    editTaskAssigneeErrMsg.style.color = "#ff0000";
    editAssignee.style.borderColor = "#ff0000";
  } else {
    editTaskAssigneeErrMsg.innerHTML = "Looks good!";
    editTaskAssigneeErrMsg.style.color = "#66CDAA";
    editAssignee.style.borderColor = "#66CDAA";
  }
};

// Edit Task Description on change validation
editTaskDescription.onchange = function () {
  if (
    editTaskDescription.value == "" ||
    editTaskDescription.value.length < 15
  ) {
    editTaskDescriptionErrMsg.innerHTML =
      "Please enter a description longer than 15 characters";
    editTaskDescriptionErrMsg.style.color = "#ff0000";
    editTaskDescription.style.borderColor = "#ff0000";
  } else {
    editTaskDescriptionErrMsg.innerHTML = "Looks good!";
    editTaskDescriptionErrMsg.style.color = "#66CDAA";
    editTaskDescription.style.borderColor = "#66CDAA";
  }
};

// END: EDIT TASK //

// START: DELETE TASK //
function deleteTask() {
  // alert("delete");
  const taskElement = event.target.closest(".delete"); // Searches for the delete button most recently clicked
  // alert("del2");
  let delIdArr = taskElement.id.split("_");
  // alert("del3");
  let retreiveId = delIdArr[1];
  // alert(retreiveId);
  taskList.deleteTask(retreiveId);
  // alert("d");
  // Delete the list row from the ul
  // let task_row = `#taskRow_${retreiveId}`;
  // var tRow = document.querySelector(task_row);
  // tRow.parentNode.removeChild(tRow);
  displayAllTasksFromStorage(listOfCards, openEditModal, deleteTask);
}

// END: DELETE TASK //

// START: ADD TASK VALIDATION //
// Set variables
let btnAddTaskSave = document.querySelector("#btnAddTaskSave");
let taskName = document.querySelector("#taskName");
let taskNameErrMsg = document.querySelector("#taskNameErrMsg");
let assignee = document.querySelector("#assignee");
let taskAssigneeErrMsg = document.querySelector("#taskAssigneeErrMsg");
let taskStatus = document.querySelector("#taskStatus");
let taskDescription = document.querySelector("#taskDescription");
let taskDescriptionErrMsg = document.querySelector("#taskDescriptionErrMsg");
let dueDate = document.querySelector("#dueDate");

// Set function (action) assigned to Add Task button
// alert("alert inside js");
btnAddTaskSave.onclick = function () {
  // alert("inside function");
  if (
    taskName.value == "" ||
    taskName.value.length < 8 ||
    taskDescription.value == "" ||
    taskDescription.value.length < 15 ||
    assignee.value == ""
  ) {
    // alert("inside if");
    taskNameErrMsg.innerHTML =
      "Please enter a task name longer than 8 characters";
    taskNameErrMsg.style.color = "#ff0000";
    taskName.style.borderColor = "#ff0000";
    taskAssigneeErrMsg.innerHTML = "Please enter an assignee";
    taskAssigneeErrMsg.style.color = "#ff0000";
    assignee.style.borderColor = "#ff0000";
    taskDescriptionErrMsg.innerHTML =
      "Please enter a description longer than 15 characters";
    taskDescriptionErrMsg.style.color = "#ff0000";
    taskDescription.style.borderColor = "#ff0000";
    // return false;
  } else {
    taskNameErrMsg.innerHTML = "Looks good!";
    taskNameErrMsg.style.color = "#66CDAA";
    taskName.style.borderColor = "#66CDAA";
    taskAssigneeErrMsg.innerHTML = "Looks good!";
    taskAssigneeErrMsg.style.color = "#66CDAA";
    assignee.style.borderColor = "#66CDAA";
    taskDescriptionErrMsg.innerHTML = "Looks good!";
    taskDescriptionErrMsg.style.color = "#66CDAA";
    taskDescription.style.borderColor = "#66CDAA";
    // return true;

    taskList.addTask(
      taskName.value,
      assignee.value,
      taskStatus.value,
      taskDescription.value,
      dueDate.value
    );
    $("#modalAdd").modal("hide"); // hides the modal once data filled out
    // addTaskToWebpage(); //called the display function (from function addTaskToWebpage() {)
    displayAllTasksFromStorage(listOfCards, openEditModal, deleteTask);
  }
};

// Once validation alerts users something is wrong, this changes feedback on a change of input

//Task Name on change validation
taskName.onchange = function () {
  if (taskName.value == "" || taskName.value.length < 8) {
    taskNameErrMsg.innerHTML =
      "Please enter a task name longer than 8 characters";
    taskNameErrMsg.style.color = "#ff0000";
    taskName.style.borderColor = "#ff0000";
  } else {
    taskNameErrMsg.innerHTML = "Looks good!";
    taskNameErrMsg.style.color = "#66CDAA";
    taskName.style.borderColor = "#66CDAA";
  }
};

//Assignee on change validation
assignee.onchange = function () {
  if (assignee.value == "") {
    taskAssigneeErrMsg.innerHTML = "Please enter an assignee";
    taskAssigneeErrMsg.style.color = "#ff0000";
    assignee.style.borderColor = "#ff0000";
  } else {
    taskAssigneeErrMsg.innerHTML = "Looks good!";
    taskAssigneeErrMsg.style.color = "#66CDAA";
    assignee.style.borderColor = "#66CDAA";
  }
};

//Task Description on change validation
taskDescription.onchange = function () {
  if (taskDescription.value == "" || taskDescription.value.length < 15) {
    taskDescriptionErrMsg.innerHTML =
      "Please enter a description longer than 15 characters";
    taskDescriptionErrMsg.style.color = "#ff0000";
    taskDescription.style.borderColor = "#ff0000";
  } else {
    taskDescriptionErrMsg.innerHTML = "Looks good!";
    taskDescriptionErrMsg.style.color = "#66CDAA";
    taskDescription.style.borderColor = "#66CDAA";
  }
};

// END: ADD TASK VALIDATION //

// START: CLEAR FIELDS //

let addTaskBug = document.querySelectorAll("button.addTaskBug");
// alert(addTaskBug);
for (let i = 0; i < addTaskBug.length; i++) {
  addTaskBug[i].onclick = function () {
    $("#modalAdd").modal("show"); //function to show the Modal at Add
    clearAllFields();
  };
}

function clearAllFields() {
  // alert("clear");
  // alert(taskName);
  taskName.value = null;
  assignee.value = null;
  taskStatus.value = null;
  taskDescription.value = null;
  dueDate.value = null;
  taskNameErrMsg.innerHTML = "";
  taskAssigneeErrMsg.innerHTML = "";
  taskDescriptionErrMsg.innerHTML = "";
  taskName.style.borderColor = "#ced4da";
  assignee.style.borderColor = "#ced4da";
  taskDescription.style.borderColor = "#ced4da";
  // taskStatus.value = selected;
}

// END: CLEAR FIELDS //

// START: STORE LIST TITLE //

// declare variable
let listTitle = document.querySelector("#listTitle");
// declare variable for title entered by user
// let listTitleVal =
// JSON.parse(localStorage.getItem("listTitle")) ||
// document.querySelector("#listTitle").value;
document.querySelector("#listTitle").value = JSON.parse(
  localStorage.getItem("listTitle")
);
// alert(document.querySelector("#listTitle").value);
// Invoke function when value changed to either retrieve from local storage or add new
listTitle.onchange = function () {
  localStorage.setItem(
    "listTitle",
    JSON.stringify(document.querySelector("#listTitle").value)
  );
  // localStorage.setItem("listTitle", JSON.stringify(listTitleVal));
  // alert(document.querySelector("#listTitle").value);
};

// END: STORE LIST TITLE //

// START: SHOW TODAY's DATE IN NAVBAR //

const dateElement = document.getElementById("date");
const options = { weekday: "long", month: "short", day: "numeric" };
const today = new Date();
dateElement.innerHTML = today.toLocaleDateString("en-US", options);

// END: SHOW TODAY's DATE IN NAVBAR //
