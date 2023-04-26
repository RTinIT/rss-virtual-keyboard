import { HTMLElement } from "../common/HTMLElement";
import { Keyboard } from "./Keyboard";
import { Output } from "./Output";

export class App extends HTMLElement {
  constructor(parentNode, keys) {
    super(parentNode, "main", "main");

    const output = new Output(this.node);
    new Keyboard(this.node, keys);
  }
}
