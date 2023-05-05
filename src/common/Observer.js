export class Observer {
  constructor() {
    this.listeners = [];
  }

  subscribe(listener) {
    this.listeners.push(listener);
  }

  unsubscribe(listener) {
    this.listeners = this.listeners.filter((elem) => elem !== listener);
  }

  emit(params) {
    this.listeners.forEach((listener) => listener(params));
  }
}
