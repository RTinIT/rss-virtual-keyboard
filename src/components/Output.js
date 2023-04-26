import { HTMLElement } from "../common/HTMLElement";

export class Output extends HTMLElement {
  constructor(parentNode) {
    super(parentNode, "textarea", "output");
    this.state = "";
  }
}
