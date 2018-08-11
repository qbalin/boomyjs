import { Bodies, Body, World } from 'matter-js';
import { clamp } from './helpers';

const MIN_PERIOD = 50;
const MAX_PERIOD = 1500;

const MIN_LIFESPAN = 100;
const MAX_LIFESPAN = 2000;

class Emitter {
  constructor(world) {
    this.world = world;
    this.period = 1000;
    this.lifespan = 200;
  }


  start(source, particleAmount) {
    this.source = source;
    this.particleAmount = particleAmount;

    setTimeout(() => {
      console.log(this.period);
      const deltaTheta = (2 * Math.PI) / this.particleAmount;
      const velocity = 5;

      for (let i = 0; i < this.particleAmount; i += 1) {
        const particle = Bodies.circle(
          this.source.position.x,
          this.source.position.y,
          2,
          {
            isSensor: true,
            label: 'soundParticle',
          },
        );
        Body.setVelocity(particle, {
          x: velocity * Math.cos(deltaTheta * i),
          y: velocity * Math.sin(deltaTheta * i),
        });

        World.add(this.world, [particle]);

        setTimeout(() => {
          World.remove(this.world, particle);
        }, this.lifespan);
      }

      this.start();
    }, this.period);
  }

  initialize(body, particleAmount) {
    this.body = body;
    this.particleAmount = particleAmount;
  }

  setPeriod(intensity) {
    // intensity is between 0 & 1
    const newPeriod = MIN_PERIOD + intensity * (MAX_PERIOD - MIN_PERIOD);


    this.period = clamp(newPeriod, MIN_PERIOD, MAX_PERIOD);
    console.log('PERIOD', this.period);
  }

  setLifespan(intensity) {
    const newLifespan = MIN_LIFESPAN + intensity * (MAX_LIFESPAN - MIN_LIFESPAN);
    this.lifespan = clamp(newLifespan, MIN_LIFESPAN, MAX_LIFESPAN);
    console.log('LIFESPAN', this.lifespan);
  }
}

export default Emitter;
