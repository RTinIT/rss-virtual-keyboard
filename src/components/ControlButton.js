import { Button } from "./Button";

export class ControlButton extends Button {
  constructor(parentNode, key, keyboardUpdate) {
    super(parentNode, key, keyboardUpdate);
    this.key = key;
  }
}
