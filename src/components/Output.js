import { HTMLElement } from "../common/HTMLElement";
import { State } from "../common/State";

export class Output extends HTMLElement {
  constructor(parentNode) {
    super(parentNode, "textarea", "output");

    this.cursorPlace = 0;
    this.state = new State();
    this.history = [];
    this.cursorPlace = null;
    this.node.onclick = () => {
      this.cursorPlace = this.node.selectionEnd;
    };
  }

  update(key) {
    const { en, code } = key.cur;
    if (code === 46) {
      if (this.cursorPlace !== null) {
        this.history.splice(this.cursorPlace, 1);
        this.node.value = this.history.join("");
        return;
      }
    }

    this.state.setData(en);
    this.history.push(en);
    this.node.value = this.history.join("");
  }
}
