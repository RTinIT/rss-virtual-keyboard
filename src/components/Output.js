import { HTMLElement } from "../common/HTMLElement";
import { State } from "../common/State";

export class Output extends HTMLElement {
  constructor(parentNode, keys) {
    super(parentNode, "textarea", "output");
    this.setAttributes({ cols: 50, rows: 10 });

    this.keys = keys;
    this.data = {
      cur: [],
      rest: [],
      getItems() {
        return [...this.cur, ...this.rest];
      },
    };
    this.capsLockActive = false;
    this.cursorPlace = this.node.selectionEnd
      ? this.node.selectionEnd
      : this.data.getItems().length;
    this.node.onclick = () => {
      this.cursorPlace = this.node.selectionEnd;
      this.data.cur = this.node.value.slice(0, this.cursorPlace).split("");
      this.data.rest = this.node.value.slice(this.cursorPlace).split("");
    };
    this.node.onblur = () => {
      if (this.node.value) {
        this.node.focus();
        this.node.selectionEnd = this.data.cur.length;
      }
    };

    window.addEventListener("keydown", (e) => {
      if (document.activeElement === this.node && e.key.length < 3) {
        if (this.capsLockActive && e.shiftKey) {
          e.preventDefault();
          this.data.cur.push(e.key.toLowerCase());
          this.node.value = this.data.getItems().join("");
        } else if (this.capsLockActive || e.shiftKey) {
          e.preventDefault();
          this.data.cur.push(e.key.toUpperCase());
          this.node.value = this.data.getItems().join("");
        } else {
          e.preventDefault();
          this.data.cur.push(e.key.toLowerCase());
          this.node.value = this.data.getItems().join("");
        }
        this.cursorPlace = this.data.cur.length;
      } else if (e.key === "Backspace") {
        this.data.cur.pop();
        this.cursorPlace--;
      } else if (e.key === "Delete") {
        this.data.rest.shift();
        this.cursorPlace = this.node.selectionEnd;
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        this.data.cur.push(this.keys["ArrowLeft"].sign);
        this.cursorPlace = this.data.cur.length;
        this.node.value = this.data.getItems().join("");
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        this.data.cur.push(this.keys["ArrowUp"].sign);
        this.cursorPlace = this.data.cur.length;
        this.node.value = this.data.getItems().join("");
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        this.data.cur.push(this.keys["ArrowRight"].sign);
        this.cursorPlace = this.data.cur.length;
        this.node.value = this.data.getItems().join("");
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        this.data.cur.push(this.keys["ArrowDown"].sign);
        this.cursorPlace = this.data.cur.length;
        this.node.value = this.data.getItems().join("");
      } else if (e.key === "Tab") {
        e.preventDefault();
        this.data.cur.push("\t");
        this.cursorPlace = this.data.cur.length;
        this.node.value = this.data.getItems().join("");
      } else if (e.key === "Enter") {
        this.data.cur.push("\n");
        this.cursorPlace = this.data.cur.length;
        this.node.value = this.data.getItems().join("");
      } else if (e.key === "CapsLock") {
        this.capsLockActive = !this.capsLockActive;
      } else if (e.key === "Space") {
        e.preventDefault();
        this.data.cur.push(" ");
        this.cursorPlace = this.data.cur.length;
        this.node.value = this.data.getItems().join("");
      }
      this.node.blur();
    });
  }

  update(key) {
    const { sign, code } = key.cur;
    if (code === 46) {
      if (this.data.rest.length) {
        this.data.rest.shift();
        this.node.value = this.data.getItems().join("");
        this.node.blur();
        return;
      } else return;
    } else if (code === 8) {
      if (this.cursorPlace === 0) return;
      this.data.cur.pop();
      this.node.value = this.data.getItems().join("");
      this.cursorPlace--;
      this.node.blur();
      return;
    } else if (code === 9) {
      this.data.cur.push("\t");
      this.node.value = this.data.getItems().join("");
      this.cursorPlace = this.data.cur.length;
      this.node.blur();
      return;
    } else if (code === 13) {
      this.data.cur.push("\n");
      this.node.value = this.data.getItems().join("");
      this.node.blur();
      return;
    } else if (code === 20) {
      this.capsLockActive = !this.capsLockActive;
      this.node.blur();
      return;
    } else if (code === 18 || code === 17 || code === 16) {
      this.node.blur();
      return;
    } else if (code === 32) {
      this.data.cur.push(" ");
      this.node.value = this.data.getItems().join("");
      this.node.blur();
      return;
    } else if (code === 37) {
      this.data.cur.push(this.keys["ArrowLeft"].sign);
      this.node.value = this.data.getItems().join("");
      this.cursorPlace = this.data.cur.length;
      this.node.blur();
      return;
    } else if (code === 38) {
      this.data.cur.push(this.keys["ArrowUp"].sign);
      this.node.value = this.data.getItems().join("");
      this.cursorPlace = this.data.cur.length;
      this.node.blur();
      return;
    } else if (code === 39) {
      this.data.cur.push(this.keys["ArrowRight"].sign);
      this.node.value = this.data.getItems().join("");
      this.cursorPlace = this.data.cur.length;
      this.node.blur();
      return;
    } else if (code === 40) {
      this.data.cur.push(this.keys["ArrowDown"].sign);
      this.node.value = this.data.getItems().join("");
      this.cursorPlace = this.data.cur.length;
      this.node.blur();
      return;
    } else if (code === 91) {
      this.node.blur();
      return;
    }
    this.data.cur.push(
      this.capsLockActive ? sign.toUpperCase() : sign.toLowerCase()
    );
    this.cursorPlace = this.data.getItems().length;
    this.node.value = this.data.getItems().join("");
    this.node.blur();
  }
}
