export class HTMLElement {
  constructor(parentNode, tag, className = "", content = "") {
    const element = document.createElement(tag);
    element.className = className;
    element.textContent = content;
    if (parentNode) {
      parentNode.append(element);
    }
    this.node = element;
  }

  destroy() {
    this.node.remove();
  }

  setAttributes(attr) {
    Object.entries(attr).forEach(([key, value]) =>
      this.node.setAttribute(key, value)
    );
  }
}
