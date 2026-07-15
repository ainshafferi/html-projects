const inputList = document.getElementById("input-list");
const listContainer = document.getElementById("list-container");
const addBtn = document.getElementById("addBtn")
const toggle = document.getElementById("themeToggle")
const darkMode = document.querySelector(".container");
const notesContainer = document.querySelector(".notes-container")
const createBtn = document.querySelector(".createBtn")
// let notes = document.querySelectorAll(".input-box")

toggle.addEventListener("change", () => {
    darkMode.classList.toggle("dark-mode");
    if (toggle.checked) {
        saveTheme("dark");
    } else {
        saveTheme("light");
    }
});

function saveTheme(theme) {
    localStorage.setItem("theme", theme);
}

function loadTheme() {
    const theme = localStorage.getItem("theme");

    if (theme === "dark") {
        darkMode.classList.add("dark-mode");
        toggle.checked = true;
    }
};

function addTask() {
    if (inputList.value == '') {
        alert("You must write something!");
    }
    else {
        let li = document.createElement("li");
        li.innerHTML = inputList.value;
        listContainer.appendChild(li);
        let span = document.createElement("span");
        span.innerHTML = "\u00d7";
        li.appendChild(span);
    }
    inputList.value = "";
    saveData();
};

listContainer.addEventListener("click", function (e) {
    if (e.target.tagName == "LI") {
        e.target.classList.toggle("checked");
        saveData();
    }
    else if (e.target.tagName == "SPAN") {
        e.target.parentElement.remove();
        saveData();
    }
}, false);

function saveData() {
    localStorage.setItem("data", listContainer.innerHTML);
    localStorage.setItem("notes", notesContainer.innerHTML);
};

function showtask() {
    listContainer.innerHTML = localStorage.getItem("data");
    notesContainer.innerHTML = localStorage.getItem("notes");
};

inputList.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        addBtn.click();
    }
});

createBtn.addEventListener("click", () => {

    // Main note container
    const note = document.createElement("div");
    note.className = "note";

    // Editable area
    const inputBox = document.createElement("p");
    inputBox.className = "input-box";
    inputBox.contentEditable = true;
    inputBox.spellcheck = false;

    // Delete button
    const deleteBtn = document.createElement("span");
    deleteBtn.className = "delete-note";
    deleteBtn.innerHTML = "\u00d7";

    // Put everything together
    note.appendChild(inputBox);
    note.appendChild(deleteBtn);

    notesContainer.appendChild(note);

    saveData();

    // Automatically place cursor inside new note
    inputBox.focus();
});

notesContainer.addEventListener("click", function (e) {

    // Delete entire note
    if (e.target.classList.contains("delete-note")) {

        e.target.parentElement.remove();
        saveData();
    }

});

// Save whenever user types
notesContainer.addEventListener("input", function () {
    saveData();
});


showtask();
loadTheme();