import TaskList from "./taskList.js";
import displayAllTasksFromStorage from "./display.js";

// for DOM test with Jest
import path from "path";
import fs from "fs";

const html = fs.readFileSync(path.resolve(__dirname, "./index.html"), "utf8");
beforeEach(() => {
  // sets up the DOM
  localStorage.clear();
  document.documentElement.innerHTML = html.toString();
});

// TESTING ADD TASK FUNCTION
test("object exists ", () => {
  const tL = new TaskList();
  tL.addTask(
    "1",
    "groceries",
    "Rachel",
    "To-do",
    "new groceries",
    "2020-08-26"
  );
  expect(tL.tasks.length).toBe(1);
});
//Type npm test in the terminal

// TESTING DELETE TASK FUNCTION
test("object deletes ", () => {
  const tL = new TaskList();
  // First you need to add a task
  tL.addTask(
    "1",
    "groceries",
    "Rachel",
    "To-do",
    "new groceries",
    "2020-08-26"
  );
  // The delete task function only takes the parameter id
  tL.deleteTask("1");
  // So you should expect the output to delete id number 1 and be 0
  expect(tL.tasks.length).toBe(0);
});
//Type npm test in the terminal

// TESTING UPDATE TASK FUNCTION
test("object updates ", () => {
  const tL = new TaskList();
  // First you need to add a task
  tL.addTask("groceries", "Rachel", "To-do", "new groceries", "2020-08-26");
  tL.updateTask(
    1,
    "cleaning",
    "Jessica",
    "Doing",
    "clean the house",
    "2020-08-27"
  );
  //   console.log(tL.tasks[0].taskName);
  expect(tL.tasks[0].id).toBe(1);
  expect(tL.tasks[0].taskName).toBe("cleaning");
  expect(tL.tasks[0].assignee).toBe("Jessica");
  expect(tL.tasks[0].status).toBe("Doing");
  expect(tL.tasks[0].description).toBe("clean the house");
  expect(tL.tasks[0].dueDate).toBe("2020-08-27");
});
//Type npm test in the terminal

// TESTING HTML ELEMENT ADDED TO PAGE
test("HTML element added to page ", () => {
  const tL = new TaskList();
  // First you need to add a task
  tL.addTask("groceries", "Rachel", "To-do", "new groceries", "2020-08-26");
  let listOfCards = document.querySelector("#listOfCards"); // Select the parent element
  displayAllTasksFromStorage(listOfCards); // Call the function
  console.log(listOfCards.innerHTML); // To be able to see on the console what it is logging
  expect(listOfCards.children.length).toBe(1); // Checking children element length has increased
});

// TESTING HTML ELEMENT DELETED FROM PAGE
test("HTML element added to page ", () => {
  const tL = new TaskList();
  // First you need to add a task
  tL.addTask("groceries", "Rachel", "To-do", "new groceries", "2020-08-26");
  tL.deleteTask(1); // Then delete the task
  let listOfCards = document.querySelector("#listOfCards"); // Select the parent element
  displayAllTasksFromStorage(listOfCards); // Call the function
  console.log(listOfCards.innerHTML); // To be able to see on the console what it is logging
  expect(listOfCards.children.length).toBe(0); // Checking children element length has decreased
});
