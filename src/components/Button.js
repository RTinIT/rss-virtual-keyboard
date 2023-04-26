import { HTMLElement } from "../common/HTMLElement";

export class Button extends HTMLElement {
  constructor(parentNode, key, onClick) {
    super(parentNode, "button", "button", key);
    this.key = key;

    this.node.onclick = () => onClick(this.key);
  }
}
