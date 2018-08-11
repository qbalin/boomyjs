import {
  Engine, Render, World,
} from 'matter-js';
import Boomy from './boomy';
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

const emitter = new SoundWavesEmitter(engine.world);
const boomy = new Boomy(emitter);
emitter.initialize(boomy.body, 50);


const walls = createMaze(engine.world);


const endParticleEmitter = new SoundWavesEmitter(engine.world);
endParticleEmitter.initialize(goal, 50);
setupEvents(engine, endParticleEmitter);


// add all of the bodies to the world
engine.world.gravity.y = 0;
World.add(engine.world, [boomy.body, ...walls, goal]);

// run the engine
Engine.run(engine);

// run the renderer
Render.run(render);
