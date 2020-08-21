import taskList from "./taskList.js";
const TaskList = new taskList();

// Display all task froms storage
export default function displayAllTasksFromStorage(
  listOfCards,
  openEditModal,
  deleteTask
) {
  let mynewtasks =
    JSON.parse(window.localStorage.getItem("mytasks")) || taskList.tasks;
  let displayAllHtml = "";
  if (mynewtasks) {
    listOfCards.innerHTML = "";
    for (let i = 0; i < mynewtasks.length; i++) {
      displayAllHtml = `<div id="taskRow_${mynewtasks[i].id}" class="row cardTask mx-0 my-1 ">
<div class="col-sm-8 pl-0 pr-3">     
<li class="list-group-item" id="taskCard">${mynewtasks[i].taskName}
<div id="demo_${mynewtasks[i].id}" class="collapse">
  <ul style="list-style-type:disc;">
  <li>Assignee: ${mynewtasks[i].assignee}</li>
  <li>Status: ${mynewtasks[i].status}</li>
  <li>Description: ${mynewtasks[i].description}</li>
  <li>Due: ${mynewtasks[i].dueDate}</li>
  </ul>
</div> 
</div>
<div class="taskBox col-sm-4 pr-0 pl-0">
<span class="pull-right">          
<button type="button" class="btn view btn-sm" data-toggle="collapse" data-target="#demo_${mynewtasks[i].id}"><i class="fa fa-eye" aria-hidden="true"></i></button>
<button id="edit_${mynewtasks[i].id}" type="button" class="btn edit btn-sm" data-toggle="modal" data-target="#modalEdit"><i class="fa fa-pencil"></i>
</button> 
<button id="delete_${mynewtasks[i].id}" type="button" class="delete btn trash btn-sm" data-toggle="modal" data-target="#modalDelete"><i class="fa fa-trash"></i></button>
</button>
</span>  
</li> 
</div>
</div> `;

      let range = document.createRange();
      let documentFragment = range.createContextualFragment(displayAllHtml);
      // local storage attach delete event listener
      documentFragment
        .querySelector("button.delete")
        .addEventListener("click", deleteTask);
      // local storage attach edit event listener
      documentFragment
        .querySelector("button.edit")
        .addEventListener("click", openEditModal);
      listOfCards.appendChild(documentFragment);
    }
  }
}
