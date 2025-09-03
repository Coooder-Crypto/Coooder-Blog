export default class EventEmitter {
  private callbacks: { [key: string]: Function[] } = {};

  on(event: string, callback: Function) {
    if (!this.callbacks[event]) {
      this.callbacks[event] = [];
    }
    this.callbacks[event].push(callback);
  }

  off(event: string, callback: Function) {
    if (this.callbacks[event]) {
      this.callbacks[event] = this.callbacks[event].filter((cb) => cb !== callback);
    }
  }

  trigger(event: string, ...args: any[]) {
    if (this.callbacks[event]) {
      this.callbacks[event].forEach((callback) => callback(...args));
    }
  }
}
