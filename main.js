// Getting the ids here
let toDoInput = document.getElementById("toDoInput");
let taskList = document.getElementById("taskList");
let taskDiv = document.getElementById("taskDiv");
let tasks = [];

function addTask(event) {
  // Stops the page from reloading when the form is submitted
  event.preventDefault();

  const taskText = toDoInput.value.trim(); // Use .trim() to clean up spaces

  if (taskText === "") {
    alert("Please add a task!");
    return; // Stop the function if the input is empty
  }

  // Create the main list item element
  let li = document.createElement("li");

  // Create span for text content (better structure for styling)
  let textSpan = document.createElement("span");
  textSpan.textContent = taskText;

  // Create Edit button
  let editBtn = document.createElement("button");
  editBtn.textContent = "Edit";
  editBtn.className = "editBtn";

  // Create Delete button
  let deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";
  deleteBtn.className = "deleteBtn";

  // Create a div to hold the buttons (this is your .liBtn container)
  let btnDiv = document.createElement("div");
  btnDiv.className = "liBtn";
  btnDiv.appendChild(editBtn);
  btnDiv.appendChild(deleteBtn);

  // Append text and buttons container to the list item
  li.appendChild(textSpan);
  li.appendChild(btnDiv);

  // Push the newly created task li into the array FIRST
  tasks.push(li);

  // Clear the visual list on the screen
  taskList.innerHTML = "";

  // 3. Loop through the whole array and append all tasks (now including the new one)
  for (let i = 0; i < tasks.length; i++) {
    taskList.appendChild(tasks[i]);
  }

  // 4. Clear the input field for the next task
  toDoInput.value = "";
}

toDoInput.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    // Prevent the default form submission just in case (good practice)
    event.preventDefault();
    document.getElementById("addBtn").click();
  }
});

function editTask(event) {
    if (event.target.className === 'editBtn') {
        const li = event.target.closest('li');
        const textSpan = li.querySelector('span');
        const currentText = textSpan.textContent;
        
        const newText = prompt('Edit your task:', currentText);
        
        if (newText !== null && newText.trim() !== '') {
            textSpan.textContent = newText.trim();
            const index = Array.from(taskList.children).indexOf(li);
            tasks[index] = li;
        }
    }
}


function deleteTask(event) {
    if (event.target.className === 'deleteBtn') {
        const li = event.target.closest('li');
        const index = Array.from(taskList.children).indexOf(li);
        
        tasks.splice(index, 1);
        taskList.removeChild(li);
    }
}

function deleteAllTasks() {
    isConfirmed = confirm("Are you sure you want to delete all task?");

    if (isConfirmed === false) {
        return;
    } else if (tasks.length === 0) {
        alert("There are no tasks here!");
        return;
    } else if (isConfirmed === true) {
        taskList.innerHTML = "";
        tasks = [];
    } else {
        return;
    }
}

// Add event listener for delete and edit functionality
taskList.addEventListener('click', deleteTask);
taskList.addEventListener('click', editTask);
