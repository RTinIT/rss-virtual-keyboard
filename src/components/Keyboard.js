import { HTMLElement } from "../common/HTMLElement";
import { State } from "../common/State";
import { Button } from "./Button";

export class Keyboard extends HTMLElement {
  constructor(parentNode, keys, outputUpdate) {
    super(parentNode, "div", "keyboard");

    this.keys = keys;
    this.state = new State();
    this.state.onUpdate.subscribe(outputUpdate);
    this.buttons = [];

    for (let key in this.keys) {
      const btn = new Button(this.node, this.keys[key], this.update.bind(this));
      btn.node.classList.add(key.toLowerCase());
      this.buttons.push(btn);
    }

    window.addEventListener("keyup", (event) => {
      const pressedKey = this.takePressedKey(event);
      this.animate(pressedKey);
      this.doIfCaps(pressedKey, event);
    });

    this.node.addEventListener("mousedown", (event) => {
      this.shiftAction(event);
    });

    this.node.addEventListener("mouseup", (event) => {
      this.shiftAction(event);
    });

    this.node.addEventListener("click", (event) => {
      if (event?.target.parentNode.textContent === "Caps Lock") {
        this.toggleCase();
        event?.target.parentElement.classList.toggle("capslock-active");
      }
    });
  }

  animate(pressedKey) {
    if (pressedKey) {
      pressedKey.node.classList.add("animated");
      setTimeout(() => {
        pressedKey.node.classList.remove("animated");
      }, 300);
    }
  }

  doIfCaps(pressedKey, e) {
    if (pressedKey && e.key === "CapsLock") {
      this.toggleCase();
      pressedKey.node.classList.toggle("capslock-active");
    }
  }

  takePressedKey(e) {
    return ["Shift", "Alt", "Control"].includes(e.key)
      ? this.buttons.find(
          (btn) => btn.key.position && e.code === btn.key.position
        )
      : this.buttons.find((btn) => btn.key.code === e.code);
  }

  shiftAction(e) {
    if (e.target?.textContent === "Shift") {
      this.toggleCase();
    }
  }

  update(key) {
    this.state.setData(key.cur);
  }

  toggleCase() {
    this.buttons.forEach((button) => {
      button.switchCase();
    });
  }
}
