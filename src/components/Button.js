import { HTMLElement } from "../common/HTMLElement";
import { State } from "../common/State";

export class Button extends HTMLElement {
  constructor(parentNode, key, keyboardUpdate) {
    super(parentNode, "button", "button", key.en);
    this.key = key;
    this.state = new State();
    this.state.onUpdate.subscribe(keyboardUpdate);

    this.node.onclick = () => this.state.setData(this.key);
  }
}
