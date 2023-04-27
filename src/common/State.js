import { Observer } from "./Observer";

export class State {
  constructor(initialState = null) {
    this.data = initialState;
    this.onUpdate = new Observer();
  }

  setData(data) {
    const prevData = this.data;
    this.data = data;
    this.onUpdate.emit({ prev: prevData, cur: this.data });
  }

  getData() {
    return this.data;
  }
}
