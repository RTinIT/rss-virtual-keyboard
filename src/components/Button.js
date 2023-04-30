import { HTMLElement } from "../common/HTMLElement";
import { State } from "../common/State";

export class Button extends HTMLElement {
  constructor(parentNode, key, keyboardUpdate) {
    super(parentNode, "button", "button", key.sign);
    this.key = key;
    this.state = new State();
    this.state.onUpdate.subscribe(keyboardUpdate);

    this.node.onclick = () => {
      if (this.key.sign === "Caps Lock") {
        this.node.classList.toggle("capslock-active");
      }
      this.state.setData(this.key);
    };
  }
}
