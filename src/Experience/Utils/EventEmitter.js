export default class EventEmitter extends EventTarget {
  constructor() {
    super();
  }

  on(eventName, callback) {
    // Errors
    if (typeof eventName === "undefined" || eventName === "") {
      console.warn("wrong eventName");
      return false;
    }

    if (typeof callback === "undefined") {
      console.warn("wrong callback");
      return false;
    }

    this.addEventListener(eventName, callback);
    return this;
  }

  off(eventName, callback) {
    // Errors
    if (typeof eventName === "undefined" || eventName === "") {
      console.warn("wrong eventName");
      return false;
    }

    this.removeEventListener(eventName, callback);
    return this;
  }

  trigger(eventName, ...eventData) {
    // Errors
    if (typeof eventName === "undefined" || eventName === "") {
      console.warn("wrong eventName");
      return false;
    }

    const event = new CustomEvent(eventName, { detail: eventData });
    this.dispatchEvent(event);
    return this;
  }
}
