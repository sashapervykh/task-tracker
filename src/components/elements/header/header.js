import createElem from "../../utiltity/createElem";
import "./header.css";

export default class Header {
  node;
  goalBtn;
  taskBtn;
  constructor() {
    const body = document.querySelector("body");
    this.goalBtn = createElem({ tag: "div", textContent: "GOALS" });
    console.log(this.goalBtn);
    this.taskBtn = createElem({ tag: "div", textContent: "TASKS" });
    this.node = createElem({
      tag: "header",
      styles: ["header"],
      children: [this.goalBtn, this.taskBtn],
    });
    body.append(this.node);
  }
}
