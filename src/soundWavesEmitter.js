const Matter = require("matter-js");
const keyboard = require("./keyboard");
const clamp = require('./helpers').clamp

const Bodies = Matter.Bodies,
	Body = Matter.Body,
	World = Matter.World;

const MIN_PERIOD = 50;
const MAX_PERIOD = 1500;

const MIN_LIFESPAN = 100;
const MAX_LIFESPAN = 2000;

class Emitter {
	constructor(source, particleAmount, world) {
		this.source = source;
		this.particleAmount = particleAmount;
		this.world = world;
		this.period = 1000; // ms
		this.lifespan = 200;
	}

	start() {
		this.timerHandler = setTimeout(() => {
			console.log(this.period)
			const deltaTheta = (2 * Math.PI) / this.particleAmount;
			const velocity = 5;

			for (let i = 0; i < this.particleAmount; ++i) {
				let particle = Bodies.circle(
					this.source.position.x,
					this.source.position.y,
					2,
					{
						isSensor: true,
						label: "soundParticle"
					}
				);
				Body.setVelocity(particle, {
					x: velocity * Math.cos(deltaTheta * i),
					y: velocity * Math.sin(deltaTheta * i)
				});

				World.add(this.world, [particle]);

				setTimeout(() => {
					World.remove(this.world, particle);
				}, this.lifespan);
			}

			this.start();
		}, this.period);

	}

	setPeriod(intensity) {
		// intensity is between 0 & 1
		const newPeriod = MIN_PERIOD + intensity * (MAX_PERIOD - MIN_PERIOD)


		this.period = clamp(newPeriod, MIN_PERIOD, MAX_PERIOD);
		console.log('PERIOD',this.period)
	}

	setLifespan(intensity) {
		const newLifespan = MIN_LIFESPAN + intensity * (MAX_LIFESPAN - MIN_LIFESPAN)
		this.lifespan = clamp(newLifespan, MIN_LIFESPAN, MAX_LIFESPAN);
		console.log('LIFESPAN',this.lifespan)
	}
}

module.exports = Emitter;
