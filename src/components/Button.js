import { HTMLElement } from "../common/HTMLElement";
import { State } from "../common/State";

export class Button extends HTMLElement {
  constructor(parentNode, key, keyboardUpdate) {
    super(parentNode, "button", "button");

    this.key = key;
    this.state = new State();
    this.state.onUpdate.subscribe(keyboardUpdate);

    this.node.onclick = () => {
      this.state.setData(this.key);
    };

    this.shiftKey = new HTMLElement(
      this.node,
      "span",
      "button__shift-key",
      this.key.shift && this.key.shift.search(/[a-zA-Z]/) !== -1
        ? ""
        : this.key.shift
    );

    this.mainKey = new HTMLElement(
      this.node,
      "span",
      "button__main-key",
      this.key.sign
    );
  }

  switchCase() {
    if (
      this.mainKey.node.textContent.search(/[a-z]/) !== -1 &&
      this.mainKey.node.textContent.length === 1
    ) {
      this.mainKey.node.textContent = this.key.shift;
    } else if (
      this.mainKey.node.textContent.length === 1 &&
      this.mainKey.node.textContent.search(/[A-Z]/) !== -1
    ) {
      this.mainKey.node.textContent = this.key.sign;
    }
  }
}
