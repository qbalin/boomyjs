const Matter = require("matter-js");
const createBoomy = require("./boomy");
const createMaze = require("./maze");
require("./sketch");
const SoundWavesEmitter = require("./soundWavesEmitter");
const setupEvents = require('./events');



const Constants = require("./constants");

const CELL_WIDTH = Constants.CELL_WIDTH,
	MAZE_X_OFFSET = Constants.MAZE_X_OFFSET,
	MAZE_Y_OFFSET = Constants.MAZE_Y_OFFSET,
	RED_COLOR = Constants.RED_COLOR
	HORIZONTAL_CELL_COUNT = Constants.HORIZONTAL_CELL_COUNT,
	VERTICAL_CELL_COUNT = Constants.VERTICAL_CELL_COUNT;



// module aliases
var Engine = Matter.Engine,
	Render = Matter.Render,
	Events = Matter.Events,
	World = Matter.World,
	Bodies = Matter.Bodies,
	Body = Matter.Body;

// create an engine
var engine = Engine.create();

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
