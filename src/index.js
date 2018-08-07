import {
  Engine, Render, World,
} from 'matter-js';
import createBoomy from './boomy';
import createMaze from './maze';
import SoundWavesEmitter from './soundWavesEmitter';
import setupEvents from './events';
import goal from './goal';

// create an engine
const engine = Engine.create({ positionIterations: 50 });

// create a renderer
const render = Render.create({
  element: document.body,
  engine,
  options: {
    width: 1400,
    height: 700,
    wireframes: false,
    // background: 'black'
  },
});

const boomy = createBoomy(engine.world);


const walls = createMaze(engine.world);


const endParticleEmitter = new SoundWavesEmitter(goal, 50, engine.world);
setupEvents(engine, endParticleEmitter);


// add all of the bodies to the world
engine.world.gravity.y = 0;
World.add(engine.world, [boomy, ...walls, goal]);

// run the engine
Engine.run(engine);

// run the renderer
Render.run(render);
