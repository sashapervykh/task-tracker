import Input from "../input/input";

export default class Main {
  node;

  constructor(taskList) {
    const body = document.querySelector("body");
    const inputGoal = new Input("Create a goal");
    this.node = createElem({
      tag: "main",
      children: [inputGoal.node],
    });
    body.append(this.node);
  }
}
