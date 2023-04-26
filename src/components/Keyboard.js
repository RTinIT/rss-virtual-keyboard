import { HTMLElement } from "../common/HTMLElement";
import { Button } from "./Button";

export class Keyboard extends HTMLElement {
  constructor(parentNode, keys) {
    super(parentNode, "div", "keyboard");

    this.keys = keys.map((key) => {
      return new Button(this.node, key.en);
    });
  }
}
