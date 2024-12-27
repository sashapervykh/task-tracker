function createDay(date) {
  const main = document.querySelector("main");
  const dayWrapper = document.createElement("section");
  dayWrapper.classList.add("day-wrapper");
  main.append(dayWrapper);
  const dayDate = document.createElement("h2");
  dayDate.textContent = date;
  dayDate.classList.add("day-date");
  dayDate.classList.add("bordered");
  dayWrapper.append(dayDate);
  createAddLine(dayWrapper);
}

function createAddLine(parent) {
  const addLineWrapper = document.createElement("form");
  parent.append(addLineWrapper);
  addLineWrapper.classList.add("add-line");
  const addingInput = document.createElement("input");
  addLineWrapper.append(addingInput);
  const addingButton = document.createElement("button");
  addingButton.textContent = "ADD";
  addingButton.classList.add("adding-button");
  addLineWrapper.append(addingButton);
  addLineWrapper.addEventListener("submit", (e) => {
    e.preventDefault();
    const task = createTask(addLineWrapper, addingInput.value);
    addingInput.value = "";
  });
}

function createTask(sibling, taskText) {
  if (!taskText) return;
  const task = document.createElement("p");
  const input = document.createElement("input");
  input.id = "taskText";
  const label = document.createElement("label");
  label.for = "taskText";
  task.classList.add("bordered", "task");
  input.type = "checkbox";
  label.textContent = taskText;
  task.append(input);
  task.append(label);
  sibling.before(task);
}

window.addEventListener("load", () => {
  createDay("Today");
  createDay("Tomorrow");
  if (localStorage.getItem("date")) {
    const prevDate = localStorage.getItem("date");
    const newDate = new Date();
    if (prevDate === newDate.getDate() + " " + newDate.getMonth()) {
      const addLine = document.querySelectorAll(".add-line");
      if (localStorage.getItem("todayTasks")) {
        const todayTasks = localStorage.getItem("todayTasks").split(" ");
        todayTasks.forEach((elem) => {
          createTask(addLine[0], elem);
        });
      }
      if (localStorage.getItem("tomorrowTasks")) {
        const tomorrowTasks = localStorage.getItem("tomorrowTasks").split(" ");
        tomorrowTasks.forEach((elem) => {
          createTask(addLine[1], elem);
        });
      }
    } else {
      if (localStorage.getItem("tomorrowTasks")) {
        const tomorrowTasks = localStorage.getItem("tomorrowTasks").split(" ");
        tomorrowTasks.forEach((elem) => {
          createTask(addLine[0], elem);
        });
      }
    }
  }
});

window.addEventListener("beforeunload", () => {
  const today = new Date();
  localStorage.setItem("date", [today.getDate(), today.getMonth()].join(" ")); // need to check the year as well; think about more clean date for checking
  const taskWrappers = document.querySelectorAll(".day-wrapper");
  const todayTasks = [];
  const tomorrowTasks = [];
  taskWrappers[0].querySelectorAll(".task").forEach((elem) => {
    todayTasks.push(elem.textContent);
  });
  if (todayTasks.length !== 0)
    localStorage.setItem("todayTasks", todayTasks.join(" "));
  taskWrappers[1].querySelectorAll(".task").forEach((elem) => {
    tomorrowTasks.push(elem.textContent);
  });
  if (tomorrowTasks.length !== 0)
    localStorage.setItem("tomorrowTasks", tomorrowTasks.join(" "));
});
