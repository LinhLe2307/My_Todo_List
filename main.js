const form = document.querySelector("#add-form");
const todoList = document.querySelector("#todo-list");
const alertText = document.querySelector("#alert");
const search = document.querySelector("#search");

form.addEventListener("submit", addItem);
todoList.addEventListener("click", removeItem);
todoList.addEventListener("click", completeItem);
todoList.addEventListener("click", undoItem);
search.addEventListener("change", searchItem);

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
    if (confirm("Are you sure?")) {
      todoList.removeChild(targetParent(e));
    }
  }
}

// COMPLETED ITEMS

function completeItem() {
  const undoButtons = document.querySelectorAll(".undo");
  const completeButtons = document.querySelectorAll(".complete");
  completeButtons.forEach((button, i) => {
    button.addEventListener("click", (e) => {
      if (e.target.classList.contains("complete")) {
        document.querySelectorAll(".list-group-item").forEach((item, index) => {
          if (index === i) {
            targetParent(e).style.backgroundColor = "#ab8d90";
            targetSiblingChild(e).forEach(
              (item) => (item.style.textDecoration = "line-through")
            );
            button.style.display = "none";
            undoButtons.forEach((undo, pos) => {
              if (index === pos) {
                undo.style.display = "inline";
              }
            });
          }
        });
      }
    });
  });
}

// UNDO ITEMS

function undoItem() {
  const undoButtons = document.querySelectorAll(".undo");
  const completeButtons = document.querySelectorAll(".complete");
  undoButtons.forEach((button, i) => {
    button.addEventListener("click", (e) => {
      if (e.target.classList.contains("undo")) {
        document.querySelectorAll(".list-group-item").forEach((item, index) => {
          if (index === i) {
            targetParent(e).style.backgroundColor = "#f5cdff";
            targetSiblingChild(e).forEach(
              (item) => (item.style.textDecoration = "none")
            );
            button.style.display = "none";
            completeButtons.forEach((complete, pos) => {
              if (index === pos) {
                complete.style.display = "inline";
              }
            });
          }
        });
      }
    });
  });
}

function targetParent(e) {
  return e.target.parentElement.parentElement;
}
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
