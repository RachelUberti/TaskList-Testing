import Task from "./task.js";

// TEST CLASS CONSTRUCTOR
test("Task constructor ", () => {
  // Use dummy values that you hard code
  const task = new Task(
    "1",
    "groceries",
    "Rachel",
    "To-do",
    "new groceries",
    "2020-08-26"
  );
  expect(task.id).toBe("1");
  expect(task.taskName).toBe("groceries");
  expect(task.assignee).toBe("Rachel");
  expect(task.status).toBe("To-do");
  expect(task.description).toBe("new groceries");
  expect(task.dueDate).toBe("2020-08-26");
});
//Type npm test in the terminal
