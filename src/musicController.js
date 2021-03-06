const MIN_VOLUME = 0.5;
const MAX_VOLUME = 10;

const MIN_SPEED = 0.1;
const MAX_SPEED = 2;

class MusicController {
  constructor() {
    this.volume = 0.5;
    this.speed = 1;
  }

  setSpeed(intensity) {
    const newSpeed = MIN_SPEED + intensity * (MAX_SPEED - MIN_SPEED);
    this.speed = Math.min(Math.max(newSpeed, MIN_SPEED), MAX_SPEED);
    console.log('SPEED', this.speed);
  }

  setVolume(intensity) {
    // Make the increase in intensity less steep
    // e (ax - c) + b
    const c = 2;
    const b = -Math.exp(-c);
    const a = c + Math.log(1 + Math.exp(-c));
    const smoothedIntensity = Math.exp(a * intensity - c) + b;

    // intensity = 2 ** intensity - 1;
    const newVolume = MIN_VOLUME + smoothedIntensity * (MAX_VOLUME - MIN_VOLUME);
    this.volume = Math.min(Math.max(newVolume, MIN_VOLUME), MAX_VOLUME);
    console.log('VOLUME', this.volume);
  }
}

const Singleton = (() => {
  let instance;

  return {
    getInstance: () => {
      if (!instance) {
        instance = new MusicController();
      }
      return instance;
    },
  };
})();

export default Singleton.getInstance();
