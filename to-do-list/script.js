const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");
const addBtn = document.getElementById("addBtn")
const toggle = document.getElementById("themeToggle")
const darkMode = document.querySelector(".container");

function addTask() {
    if (inputBox.value == '') {
        alert("You must write something!");
    }
    else {
        let li = document.createElement("li");
        li.innerHTML = inputBox.value;
        listContainer.appendChild(li);
        let span = document.createElement("span");
        span.innerHTML = "\u00d7";
        li.appendChild(span);
    }
    inputBox.value = "";
    saveData();
}

listContainer.addEventListener("click", function (e) {
    if (e.target.tagName == "LI") {
        e.target.classList.toggle("checked");
        saveData();
    }
    else if (e.target.tagName == "SPAN") {
        e.target.parentElement.remove();
        saveData();
    }
}, false)

function saveData() {
    localStorage.setItem("data", listContainer.innerHTML);
}

function showtask() {
    listContainer.innerHTML = localStorage.getItem("data");
}

inputBox.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        addBtn.click();
    }
});

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
}
showtask();
loadTheme();