import { hasCapsLock } from "./KeyCapsLock";

export class ActionKey {
  constructor(data, cursorPlace, keys) {
    this.data = data;
    this.keysData = keys;
    this.cursorPlace = cursorPlace;
  }

  backspace() {
    this.data.removePrev();
    return this.cursorPlace--;
  }

  delete() {
    this.data.removeNext();
    return this.cursorPlace;
  }

  arrowleft(key) {
    this.data.add(this.keysData[key].sign);
    this.cursorPlace = this.data.getCurLength();
    return this.cursorPlace;
  }

  arrowright(key) {
    this.data.add(this.keysData[key].sign);
    this.cursorPlace = this.data.getCurLength();
    return this.cursorPlace;
  }

  arrowup(key) {
    this.data.add(this.keysData[key].sign);
    this.cursorPlace = this.data.getCurLength();
    return this.cursorPlace;
  }

  arrowdown(key) {
    this.data.add(this.keysData[key].sign);
    this.cursorPlace = this.data.getCurLength();
    return this.cursorPlace;
  }

  tab() {
    this.data.add("\t");
    this.cursorPlace = this.data.getCurLength();
    return this.cursorPlace;
  }

  enter() {
    this.data.add("\n");
    this.cursorPlace = this.data.getCurLength();
    return this.cursorPlace;
  }

  space() {
    this.data.add(" ");
    this.cursorPlace = this.data.getCurLength();
    return this.cursorPlace;
  }

  control() {
    return this.cursorPlace;
  }

  alt() {
    return this.cursorPlace;
  }

  capslock() {
    hasCapsLock.toggle();
    return this.cursorPlace;
  }
}
