export default function createElem({ tag, styles, textContent, children }) {
  const node = document.createElement(tag);
  if (styles) {
    node.classList.add(...styles);
  }
  if (textContent) {
    node.textContent = textContent;
  }
  if (children) {
    children.forEach((elem) => {
      node.append(elem);
    });
  }

  return node;
}
