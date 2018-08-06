import {Engine, Render, Events, World, Bodies, Body} from 'matter-js' 
import { CELL_WIDTH, MAZE_X_OFFSET, MAZE_Y_OFFSET, RED_COLOR, HORIZONTAL_CELL_COUNT, VERTICAL_CELL_COUNT } from "./constants";
import createBoomy from "./boomy";
import createMaze from "./maze"; 
import SoundWavesEmitter from "./soundWavesEmitter";
import setupEvents from './events';



// create an engine
var engine = Engine.create({ positionIterations: 50});

// create a renderer
var render = Render.create({
	element: document.body,
	engine: engine,
	options: {
		width: 1400,
		height: 700,
		wireframes: false
		// background: 'black'
	}
});

const boomy = createBoomy(engine.world);


const walls = createMaze(engine.world);

const goal = require('./goal');
const endParticleEmitter = new SoundWavesEmitter(goal, 50, engine.world);
setupEvents(engine, endParticleEmitter);





// add all of the bodies to the world
engine.world.gravity.y = 0;
World.add(engine.world, [boomy, ...walls, goal]);

// run the engine
Engine.run(engine);

// run the renderer
Render.run(render);
