import { Bodies, Body } from 'matter-js';
import keyboard from './keyboard';
import musicController from './musicController';
import { clamp } from './helpers';
import { CELL_WIDTH, MAZE_X_OFFSET, MAZE_Y_OFFSET } from './constants';

const MIN_MOVE_SPEED = 1;
const MAX_MOVE_SPEED = 10;
const MIN_INTENSITY = 0;
const MAX_INTENSITY = 1;

class Boomy {
  constructor(emitter) {
    this.emitter = emitter;
    this.volumeIntensity = 0.5;
    this.speedIntensity = 0.5;
    this.boomySpeed = 5;
    this.initialize.bind(this)();
  }

  initialize() {
    this.boomyBody = Bodies.circle(
      MAZE_X_OFFSET + CELL_WIDTH / 2,
      MAZE_Y_OFFSET + CELL_WIDTH / 2,
      15,
      {
        label: 'boomy',
        frictionAir: 0.3,
      },
    );

    this.emitter.start();
    this.setupEvents();
  }

  setBoomySpeed(intensity) {
    this.boomySpeed = MIN_MOVE_SPEED + intensity * (MIN_MOVE_SPEED + MAX_MOVE_SPEED);
  }

  setVolume() {
    this.emitter.setLifespan(this.volumeIntensity);
    musicController.setVolume(this.volumeIntensity);
    this.setBoomySpeed(1 - this.volumeIntensity);
  }

  setSpeed() {
    this.emitter.setPeriod(1 - this.speedIntensity);
    musicController.setSpeed(this.speedIntensity);
  }

  setupEvents() {
    keyboard.on('keydown', 'ArrowRight', () => {
      Body.setVelocity(this.boomyBody, { x: this.boomySpeed, y: 0 });
    });

    keyboard.on('keydown', 'ArrowLeft', () => {
      Body.setVelocity(this.boomyBody, { x: -this.boomySpeed, y: 0 });
    });

    keyboard.on('keydown', 'ArrowUp', () => {
      Body.setVelocity(this.boomyBody, { x: 0, y: -this.boomySpeed });
    });

    keyboard.on('keydown', 'ArrowDown', () => {
      Body.setVelocity(this.boomyBody, { x: 0, y: this.boomySpeed });
    });

    keyboard.on('keydown', 'KeyS', () => {
      this.speedIntensity = clamp(
        this.speedIntensity + 0.05,
        MIN_INTENSITY,
        MAX_INTENSITY,
      );
      this.setSpeed();
    });

    keyboard.on('keydown', 'KeyX', () => {
      this.speedIntensity = clamp(
        this.speedIntensity - 0.05,
        MIN_INTENSITY,
        MAX_INTENSITY,
      );
      this.setSpeed();
    });

    keyboard.on('keydown', 'KeyD', () => {
      this.volumeIntensity = clamp(
        this.volumeIntensity + 0.05,
        MIN_INTENSITY,
        MAX_INTENSITY,
      );
      this.setVolume();
    });

    keyboard.on('keydown', 'KeyC', () => {
      this.volumeIntensity = clamp(
        this.volumeIntensity - 0.05,
        MIN_INTENSITY,
        MAX_INTENSITY,
      );
      this.setVolume();
    });
  }

  get body() {
    return this.boomyBody;
  }
}

export default Boomy;
