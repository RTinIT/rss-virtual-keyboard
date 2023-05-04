import { hasCapsLock } from "./KeyCapsLock";

export class Key {
  constructor(data, dataKeys, cursorPlace) {
    this.data = data;
    this.dataKeys = dataKeys;
    this.cursorPlace = cursorPlace;
  }

  action(code, event) {
    const { shift, sign } = this.dataKeys[code] ? this.dataKeys[code] : "";
    if (event?.shiftKey && event?.key !== "Shift") {
      this.data.add(hasCapsLock.getValue() ? sign : shift);
      return this.cursorPlace++;
    }
    if (event?.key === "Shift") return this.cursorPlace;
    this.data.add(hasCapsLock.getValue() ? shift : sign);
    return this.cursorPlace++;
  }
}
