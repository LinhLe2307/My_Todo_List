const form = document.querySelector("#add-form");
const todoList = document.querySelector("#todo-list");
const alertText = document.querySelector("#alert");
const search = document.querySelector("#search");
const title = document.querySelector("#title");
const description = document.querySelector("#description");

// ADD ITEMS

//getting it from localStorage
let itemsArray = localStorage.getItem("items")
  ? JSON.parse(localStorage.getItem("items"))
  : [];

//saving it locally
localStorage.setItem("items", JSON.stringify(itemsArray));
let data = JSON.parse(localStorage.getItem("items"));

function addItem(e) {
  e.preventDefault();
  if (title.value != "" && description.value != "") {
    createItem(title.value, description.value);
    itemsArray.push([title.value, description.value]);
    data.push([title.value, description.value]);
    localStorage.setItem("items", JSON.stringify(itemsArray));
    alertText.style.display = "none";
  } else {
    alertText.style.display = "block";
  }
  title.value = "";
  description.value = "";
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
  div.classList.add("button-group");

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
    const titleName = e.target.parentElement.previousElementSibling.firstChild;
    const descriptionName = [
      ...e.target.parentElement.previousElementSibling.children,
    ][1];
    if (confirm("Are you sure?")) {
      todoList.removeChild(li);
    }
    let newData = JSON.parse(localStorage.getItem("items"));
    for (let i of data) {
      if (
        i[0] === titleName.textContent &&
        i[1] === descriptionName.textContent
      ) {
        // console.log("i data", i, data.indexOf(i));
        newData.splice(data.indexOf(i), 1);
        data = newData;
      }
    }
    localStorage.setItem("items", JSON.stringify(data));
    console.log("DATA: ", data);
  }
}

// COMPLETED ITEMS

function completeAndUndo(e) {
  const li = e.target.parentElement.parentElement;
  const titleAndDescription =
    e.target.parentElement.previousElementSibling.children;

  if (e.target.classList.contains("complete")) {
    li.style.backgroundColor = "#ab8d90";
    [...titleAndDescription].forEach(
      (item) => (item.style.textDecoration = "line-through")
    );
    e.target.style.display = "none";
    e.target.nextElementSibling.style.display = "inline";
  }
  if (e.target.classList.contains("undo")) {
    li.style.backgroundColor = "#f5cdff";
    [...titleAndDescription].forEach(
      (item) => (item.style.textDecoration = "none")
    );
    e.target.style.display = "none";
    e.target.previousElementSibling.style.display = "inline";
  }
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

data.forEach((item) => createItem(item[0], item[1]));

form.addEventListener("submit", addItem);
todoList.addEventListener("click", removeItem);
todoList.addEventListener("click", completeAndUndo);
search.addEventListener("change", searchItem);

// ANOTHER WAY TO DO THE COMPLETE AND UNDO BUTTONS

// function completeAndUndo(e) {
//   const undoButtons = document.querySelectorAll(".undo");
//   const completeButtons = document.querySelectorAll(".complete");
// completeButtons.forEach((completeButton, i) => {
//   completeButton.addEventListener("click", (e) =>
//     changeBackground(
//       e,
//       completeButton,
//       i,
//       "complete",
//       "#ab8d90",
//       "line-through",
//       undoButtons
//     )
//   );
// });

// undoButtons.forEach((undoButton, i) => {
//   undoButton.addEventListener("click", (e) =>
//     changeBackground(
//       e,
//       undoButton,
//       i,
//       "undo",
//       "#f5cdff",
//       "none",
//       completeButtons
//     )
//   );
// });
// }

// function changeBackground(
//   e,
//   buttonItem,
//   i,
//   buttonClassName,
//   backgroundColor,
//   textDecoration,
//   buttonLists
// ) {
//   const listGroupItems = document.querySelectorAll(".list-group-item");
//   if (e.target.classList.contains(buttonClassName)) {
//     [...listGroupItems][i].style.backgroundColor = backgroundColor;

//     //this is for taking the h3, p => child of first div => sibling of second div => parentElement of e.target
//     [...e.target.parentElement.previousElementSibling.children].forEach(
//       (item) => (item.style.textDecoration = textDecoration)
//     );

//     //hide the complete
//     buttonItem.style.display = "none";

//     //button changed
//     [...buttonLists][i].style.display = "inline";
//   }
// }
