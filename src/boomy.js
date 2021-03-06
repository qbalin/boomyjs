import { Bodies, Body } from 'matter-js';
import keyboard from './keyboard';
import SoundWavesEmitter from './soundWavesEmitter';
import musicController from './musicController';
import { clamp } from './helpers';
import { CELL_WIDTH, MAZE_X_OFFSET, MAZE_Y_OFFSET } from './constants';

const MIN_MOVE_SPEED = 1;
const MAX_MOVE_SPEED = 10;
const MIN_INTENSITY = 0;
const MAX_INTENSITY = 1;

const createBoomy = (world) => {
  const boomy = Bodies.circle(
    MAZE_X_OFFSET + CELL_WIDTH / 2,
    MAZE_Y_OFFSET + CELL_WIDTH / 2,
    15,
    {
      label: 'boomy',
      frictionAir: 0.3,
    },
  );

  let volumeIntensity = 0.5;
  let speedIntensity = 0.5;
  let boomySpeed = 5;

  const emitter = new SoundWavesEmitter(boomy, 50, world);
  emitter.start();

  const setBoomySpeed = (intensity) => {
    boomySpeed = MIN_MOVE_SPEED + intensity * (MIN_MOVE_SPEED + MAX_MOVE_SPEED);
    console.log('boomySpeed', boomySpeed);
  };

  const setVolume = (intensity) => {
    emitter.setLifespan(intensity);
    musicController.setVolume(intensity);
    setBoomySpeed(1 - intensity);
  };

  const setSpeed = () => {
    emitter.setPeriod(1 - speedIntensity);
    musicController.setSpeed(speedIntensity);
  };

  keyboard.on('keydown', 'ArrowRight', () => {
    Body.setVelocity(boomy, { x: boomySpeed, y: 0 });
  });

  keyboard.on('keydown', 'ArrowLeft', () => {
    Body.setVelocity(boomy, { x: -boomySpeed, y: 0 });
  });

  keyboard.on('keydown', 'ArrowUp', () => {
    Body.setVelocity(boomy, { x: 0, y: -boomySpeed });
  });

  keyboard.on('keydown', 'ArrowDown', () => {
    Body.setVelocity(boomy, { x: 0, y: boomySpeed });
  });

  keyboard.on('keydown', 'KeyS', () => {
    speedIntensity = clamp(
      speedIntensity + 0.05,
      MIN_INTENSITY,
      MAX_INTENSITY,
    );
    setSpeed(speedIntensity);
  });

  keyboard.on('keydown', 'KeyX', () => {
    speedIntensity = clamp(
      speedIntensity - 0.05,
      MIN_INTENSITY,
      MAX_INTENSITY,
    );
    setSpeed(speedIntensity);
  });

  keyboard.on('keydown', 'KeyD', () => {
    volumeIntensity = clamp(
      volumeIntensity + 0.05,
      MIN_INTENSITY,
      MAX_INTENSITY,
    );
    setVolume(volumeIntensity);
  });

  keyboard.on('keydown', 'KeyC', () => {
    volumeIntensity = clamp(
      volumeIntensity - 0.05,
      MIN_INTENSITY,
      MAX_INTENSITY,
    );
    setVolume(volumeIntensity);
  });

  return boomy;
};

export default createBoomy;
