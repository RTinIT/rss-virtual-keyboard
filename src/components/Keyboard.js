import { HTMLElement } from "../common/HTMLElement";
import { State } from "../common/State";
import { Button } from "./Button";
import { ControlButton } from "./ControlButton";

export class Keyboard extends HTMLElement {
  constructor(parentNode, keys, outputUpdate) {
    super(parentNode, "div", "keyboard");

    this.keys = keys;
    this.state = new State();
    this.state.onUpdate.subscribe(outputUpdate);

    this.digitRow = new HTMLElement(this.node, "div", "row");
    this.signTopRow = new HTMLElement(this.node, "div", "row");
    this.signMidRow = new HTMLElement(this.node, "div", "row");
    this.signBotRow = new HTMLElement(this.node, "div", "row");
    this.controlRow = new HTMLElement(this.node, "div", "row");
    this.buttons = [];

    window.addEventListener("keyup", (e) => {
      let pressedKey;
      if (
        e.key.includes("Shift") ||
        e.key.includes("Alt") ||
        e.key.includes("Control")
      ) {
        pressedKey = this.buttons.find(
          (btn) => btn.key.position && e.code === btn.key.position
        );
      } else {
        pressedKey = this.buttons.find((btn) => btn.key.code === e.code);
      }

      if (pressedKey) {
        pressedKey.node.classList.add("animated");
        setTimeout(() => {
          pressedKey.node.classList.remove("animated");
        }, 300);
      }
      if (pressedKey && e.key === "CapsLock") {
        this.toggleCase();
        pressedKey.node.classList.toggle("capslock-active");
      }
    });

    window.addEventListener("mousedown", (e) => {
      if (e.target.textContent === "Shift") {
        this.toggleCase();
      }
    });
    window.addEventListener("mouseup", (e) => {
      if (e.target.textContent === "Shift") {
        this.toggleCase();
      }
    });

    this.node.addEventListener("click", (e) => {
      if (e.target.parentNode.textContent === "Caps Lock") {
        this.toggleCase();
        e.target.parentElement.classList.toggle("capslock-active");
      }
    });

    this.createRow(
      this.digitRow.node,
      13,
      Object.values(keys).slice(0, 13),
      new ControlButton(null, keys["Backspace"], this.update.bind(this))
    );
    this.createRow(
      this.signTopRow.node,
      12,
      Object.values(keys).slice(15, 27),
      new ControlButton(null, keys["Tab"], this.update.bind(this)),
      new ControlButton(null, keys["Delete"], this.update.bind(this))
    );
    this.createRow(
      this.signMidRow.node,
      12,
      Object.values(keys).slice(29, 41),
      new ControlButton(null, keys["CapsLock"], this.update.bind(this)),
      new ControlButton(null, keys["Enter"], this.update.bind(this))
    );
    this.createRow(
      this.signBotRow.node,
      10,
      Object.values(keys).slice(43, 53),
      new ControlButton(null, keys["ShiftLeft"], this.update.bind(this)),
      new ControlButton(null, keys["ArrowUp"], this.update.bind(this)),
      new ControlButton(null, keys["ShiftRight"], this.update.bind(this))
    );

    for (let i = 0; i < Object.values(keys).slice(55, 63).length; i++) {
      const controlBtn = new ControlButton(
        this.controlRow.node,
        Object.values(keys).slice(55, 64)[i],
        this.update.bind(this)
      );
      this.buttons.push(controlBtn);
    }
  }

  update(key) {
    this.state.setData(key.cur);
  }

  createRow(parent, amount, keyData, ...controls) {
    const row = [];
    if (controls.length === 1) {
      const filledRow = this.fillArray(parent, row, amount, keyData);
      filledRow.push(controls[0]);
      this.buttons.push(controls[0]);
      parent.append(controls[0].node);
    } else {
      row[0] = controls[0];
      parent.append(controls[0].node);
      this.buttons.push(controls[0]);
      const filledRow = this.fillArray(parent, row, amount, keyData);
      controls.slice(1).forEach((control) => {
        filledRow.push(control);
        parent.append(control.node);
        this.buttons.push(control);
      });
    }
  }

  fillArray(parent, arr, amount, keyData) {
    for (let i = 0; i < amount; i++) {
      const btn = new Button(parent, keyData[i], this.update.bind(this));
      arr.push(btn);
      this.buttons.push(btn);
    }
    return arr;
  }

  toggleCase() {
    this.buttons.forEach((button) => {
      button.switchCase();
    });
  }
}
