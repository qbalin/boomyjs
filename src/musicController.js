const MIN_VOLUME = 0.5
const MAX_VOLUME = 10

const MIN_SPEED = 0.1
const MAX_SPEED = 2

class MusicController {
	constructor() {
		this.volume = 0.5;
		this.speed = 1;
	}

	setSpeed(intensity) {
		const newSpeed = MIN_SPEED + intensity * (MAX_SPEED - MIN_SPEED);
		this.speed = Math.min(Math.max(newSpeed, MIN_SPEED), MAX_SPEED);
		console.log('SPEED', this.speed)
	}

	setVolume(intensity) {
	    const newVolume = MIN_VOLUME + intensity * (MAX_VOLUME - MIN_VOLUME);
		this.volume = Math.min(Math.max(newVolume, MIN_VOLUME), MAX_VOLUME);	
		console.log('VOLUME', this.volume)
	}
}

const Singleton = (() => {
	var instance;

	return {
		getInstance: () => {
			if (!instance) {
				instance = new MusicController();
			}
			return instance;
		}
	}
})();

export default Singleton.getInstance();
