import { Events } from 'matter-js';
import { RED_COLOR } from './constants';

const setupEvents = (engine, endParticleEmitter) => {
  Events.on(engine, 'collisionStart', (event) => {
    const { pairs } = event;

    for (let i = 0, j = pairs.length; i !== j; i += 1) {
      const pair = pairs[i];

      if (
        (pair.bodyA.label === 'wall'
        && pair.bodyB.label === 'soundParticle')
      || (pair.bodyB.label === 'wall'
        && pair.bodyA.label === 'soundParticle')
      ) {
        const wall = pair.bodyA.label === 'wall' ? pair.bodyA : pair.bodyB;

        if (wall.render.strokeStyle !== RED_COLOR) {
          wall.render.strokeStyle = RED_COLOR;
          setTimeout(() => {
            wall.render.strokeStyle = 'transparent';
          }, 250);
        }
      }

      if (
        (pair.bodyA.label === 'boomy' && pair.bodyB.label === 'goal')
        || (pair.bodyB.label === 'boomy' && pair.bodyA.label === 'goal')
      ) {
        endParticleEmitter.start();
      }
    }
  });
};

export default setupEvents;
