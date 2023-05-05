import { HTMLElement } from "../common/HTMLElement";
import { ActionKey } from "./ActionKey";
import { Key } from "./Key";
import { OutputData } from "./OutputData";

export class Output extends HTMLElement {
  constructor(parentNode, keys) {
    super(parentNode, "textarea", "output");
    this.setAttributes({ cols: 50, rows: 10 });

    this.keys = keys;
    this.data = new OutputData();
    this.cursorPlace = this.node.selectionEnd
      ? this.node.selectionEnd
      : this.data.getLength();
    this.key = new Key(this.data, this.keys, this.cursorPlace);
    this.actionKey = new ActionKey(this.data, this.cursorPlace, this.keys);

    this.node.onclick = () => {
      this.cursorPlace = this.node.selectionEnd;
      this.actionKey.cursorPlace = this.cursorPlace;
      this.data.current = this.node.value.slice(0, this.cursorPlace).split("");
      this.data.rest = this.node.value.slice(this.cursorPlace).split("");
    };

    this.node.onblur = () => {
      if (this.node.value) {
        this.node.focus();
        this.node.selectionEnd = this.data.getCurLength();
      }
    };

    window.addEventListener("keydown", (e) => {
      if (e.code !== "F12") {
        e.preventDefault();
        this.cursorPlace =
          this.actionKey[e.key.toLowerCase()]?.(e.key) ??
          this.key.action(e.code, e);
        this.node.value = this.data.getItems();
        this.node.blur();
      }
    });
  }

  update(key) {
    const { code } = key.cur;
    this.cursorPlace =
      this.actionKey[code.toLowerCase()]?.(code) ?? this.key.action(code);
    this.cursorPlace = this.data.getLength();
    this.node.value = this.data.getItems();
    this.node.blur();
  }
}
