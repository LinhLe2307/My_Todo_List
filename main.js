const form = document.querySelector("#add-form");
const todoList = document.querySelector("#todo-list");
const alertText = document.querySelector("#alert");
const search = document.querySelector("#search");

// ADD ITEMS
function addItem(e) {
  e.preventDefault();
  const title = document.querySelector("#title").value;
  const description = document.querySelector("#description").value;
  if (title != "" && description != "") {
    createItem(title, description);
    alertText.style.display = "none";
  } else {
    alertText.style.display = "block";
  }
}

// this is for creating title and description
function createItem(title, description) {
  const li = document.createElement("li");
  const h3 = document.createElement("h3");
  const p = document.createElement("p");
  const div = document.createElement("div");

  li.classList.add("list-group-item");
  h3.appendChild(document.createTextNode(title));
  p.appendChild(document.createTextNode(description));

  h3.classList.add("item-name");

  div.appendChild(h3);
  div.appendChild(p);

  li.appendChild(div);
  createButton(li);

  todoList.appendChild(li);
}

// this is for creating complete button, undo button, and delete button
function createButton(li) {
  const complete = document.createElement("button");
  const remove = document.createElement("button");
  const undo = document.createElement("button");
  const div = document.createElement("div");

  complete.classList.add("complete");
  undo.classList.add("undo");
  remove.classList.add("remove");

  complete.setAttribute("type", "button");
  undo.setAttribute("type", "button");
  remove.setAttribute("type", "button");

  complete.appendChild(document.createTextNode("Complete"));
  undo.appendChild(document.createTextNode("Undo"));
  remove.appendChild(document.createTextNode("Delete"));

  div.appendChild(complete);
  div.appendChild(undo);
  div.appendChild(remove);

  li.appendChild(div);
}

// REMOVE ITEMS
function removeItem(e) {
  if (e.target.classList.contains("remove")) {
    //this is for taking the li => parentElement of div => parentElement of e.target
    const li = e.target.parentElement.parentElement;
    if (confirm("Are you sure?")) {
      todoList.removeChild(li);
    }
  }
}

// COMPLETED ITEMS

function completeItem() {
  const undoButtons = document.querySelectorAll(".undo");
  const completeButtons = document.querySelectorAll(".complete");
  const listGroupItems = document.querySelectorAll(".list-group-item");

  //we need to loop every complete button, otherwise it can only work for the first one
  completeButtons.forEach((button, i) => {
    button.addEventListener("click", (e) => {
      if (e.target.classList.contains("complete")) {
        [...listGroupItems][i].style.backgroundColor = "#ab8d90";
        //change h3, p style
        targetSiblingChild(e).forEach(
          (item) => (item.style.textDecoration = "line-through")
        );
        //hide the undo
        button.style.display = "none";
        //undo button changed
        [...undoButtons][i].style.display = "inline";
      }
    });
  });
}

// UNDO ITEMS

function undoItem() {
  const undoButtons = document.querySelectorAll(".undo");
  const completeButtons = document.querySelectorAll(".complete");

  const listGroupItems = document.querySelectorAll(".list-group-item");

  //we need to loop every undo button, otherwise it can only work for the first one
  undoButtons.forEach((button, i) => {
    button.addEventListener("click", (e) => {
      if (e.target.classList.contains("undo")) {
        [...listGroupItems][i].style.backgroundColor = "#f5cdff";
        //change h3, p style
        targetSiblingChild(e).forEach(
          (item) => (item.style.textDecoration = "none")
        );
        //hide the complete
        button.style.display = "none";
        //complete button changed
        [...completeButtons][i].style.display = "inline";
      }
    });
  });
}

//this is for taking the h3, p => child of first div => sibling of second div => parentElement of e.target
function targetSiblingChild(e) {
  return [...e.target.parentElement.previousElementSibling.children];
}

// SEARCH ITEM
function searchItem(e) {
  const itemNames = document.querySelectorAll(".item-name");
  const inputText = e.target.value.toLowerCase();
  itemNames.forEach((itemName) => {
    const itemList = itemName.parentElement.parentElement;
    if (itemName.textContent.toLowerCase().indexOf(inputText) != -1) {
      itemList.style.display = "flex";
    } else {
      itemList.style.display = "none";
    }
  });
}

form.addEventListener("submit", addItem);
todoList.addEventListener("click", removeItem);
todoList.addEventListener("click", completeItem);
todoList.addEventListener("click", undoItem);
search.addEventListener("change", searchItem);
