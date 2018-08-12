class Keyboard {
  constructor() {
    window.onkeydown = this.onKeyDown.bind(this);
    window.onkeyup = this.onKeyUp.bind(this);
    this.state = {};
    this.listeners = { keydown: {}, keyup: {} };
  }

  onKeyDown(event) {
    if (/Arrow/.test(event.code)) {
      event.preventDefault();
    }

    this.state[event.code] = true;

    if (this.listeners.keydown[event.code]) {
      this.listeners.keydown[event.code]();
    }
  }

  onKeyUp(event) {
    if (/Arrow/.test(event.code)) {
      event.preventDefault();
    }

    this.state[event.code] = false;

    if (this.listeners.keyup[event.code]) {
      this.listeners.keyup[event.code]();
    }
  }

  on(keyEvent, key, fn) {
    this.listeners[keyEvent][key] = fn;
  }
}

const keyboard = new Keyboard();

export default keyboard;
