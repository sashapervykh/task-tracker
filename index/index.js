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

createDay("Mo, 28.02.2024");
