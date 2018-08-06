class Keyboard {
	constructor() {
		window.onkeydown = this.onKeyDown.bind(this);
		window.onkeyup = this.onKeyUp.bind(this);
		this.state = {};
		this.listeners = { keydown: {}, keyup: {} };
	}

    onKeyDown(event) {        
    	this.state[event.code] = true

    	this.listeners.keydown[event.code] && this.listeners.keydown[event.code]()
    }

    onKeyUp(event) {
    	this.state[event.code] = false

    	this.listeners.keyup[event.code] && this.listeners.keyup[event.code]()
    }

    on(keyEvent, key, fn) {
    	this.listeners[keyEvent][key] = fn;
    }

}

const keyboard = new Keyboard();

module.exports = keyboard;