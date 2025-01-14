import createElem from "../../utiltity/createElem";

export default class Input {
  node;
  constructor(textContent) {
    const input = createElem({ tag: "input" });
    const label = createElem({
      tag: "label",
      textContent: textContent,
      children: [input],
    });
    const button = createElem({ tag: "button", textContent: "CREATE" });
    this.node = createElem({
      tag: "section",
      children: [label, button],
    });
  }
}
