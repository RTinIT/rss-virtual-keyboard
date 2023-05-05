import { HTMLElement } from "../common/HTMLElement";
import { Keyboard } from "./Keyboard";
import { Output } from "./Output";

export class App extends HTMLElement {
  constructor(parentNode, keys) {
    super(parentNode, "main", "main");

    new HTMLElement(this.node, "h1", "main__title", "Virtual Keyboard");
    const output = new Output(this.node, keys);
    new Keyboard(this.node, keys, output.update.bind(output));
  }
}
