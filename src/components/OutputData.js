export class OutputData {
  constructor() {
    this.current = [];
    this.rest = [];
  }

  add(value) {
    this.current.push(value);
  }

  getItems() {
    return [...this.current, ...this.rest].join("");
  }

  getLength() {
    const data = this.getItems();
    return data.length;
  }

  getCurLength() {
    return this.current.length;
  }

  getRestLength() {
    return this.rest.length;
  }

  removeNext() {
    this.rest.shift();
  }

  removePrev() {
    this.current.pop();
  }
}
