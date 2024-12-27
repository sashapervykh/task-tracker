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
    const task = document.createElement("div");
    task.textContent = addingInput.value;
    addingInput.value = "";
    addLineWrapper.before(task);
  });
}

createDay("Mo, 28.02.2024");
