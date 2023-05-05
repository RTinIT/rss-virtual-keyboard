class KeyCapsLock {
  constructor(initValue) {
    this._value = initValue;
  }

  getValue() {
    return this._value;
  }

  toggle() {
    this._value = !this._value;
  }
}

export const hasCapsLock = new KeyCapsLock(false);
