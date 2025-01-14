import createElem from "../../utiltity/createElem";
import Input from "../input/input";

export default class Main {
  node;

  constructor(taskList) {
    const body = document.querySelector("body");
    const inputGoal = new Input("CREATE A GOAL");
    this.node = createElem({
      tag: "main",
      children: [inputGoal.node],
    });
    body.append(this.node);
  }
}
