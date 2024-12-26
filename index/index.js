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
}

createDay("Mo, 28.02.2024");
createDay();
createDay();
createDay();
