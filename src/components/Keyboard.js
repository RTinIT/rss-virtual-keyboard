import { HTMLElement } from "../common/HTMLElement";
import { State } from "../common/State";
import { Button } from "./Button";

export class Keyboard extends HTMLElement {
  constructor(parentNode, keys, outputUpdate) {
    super(parentNode, "div", "keyboard");

    this.state = new State();
    this.state.onUpdate.subscribe(outputUpdate);

    this.keys = keys.map((key) => {
      return new Button(this.node, key, this.update.bind(this));
    });
  }

  update(key) {
    this.state.setData(key.cur);
  }
}
