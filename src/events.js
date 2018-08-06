import { Events } from "matter-js";
import { RED_COLOR } from "./constants";

const setupEvents = (engine, endParticleEmitter) => {
	Events.on(engine, "collisionStart", function(event) {
		let pairs = event.pairs;

		for (let i = 0, j = pairs.length; i != j; ++i) {
			let pair = pairs[i];

			if (
				(pair.bodyA.label === "wall" &&
					pair.bodyB.label === "soundParticle") ||
				(pair.bodyB.label === "wall" &&
					pair.bodyA.label === "soundParticle")
			) {
				let wall =
					pair.bodyA.label === "wall" ? pair.bodyA : pair.bodyB;
				let soundParticle =
					pair.bodyA.label === "soundParticle"
						? pair.bodyA
						: pair.bodyB;

				if (wall.render.strokeStyle !== RED_COLOR) {
					wall.render.strokeStyle = RED_COLOR;
					let handler = setTimeout(() => {
						wall.render.strokeStyle = "transparent";
					}, 500);
				}
			}

			if (
				(pair.bodyA.label === "boomy" && pair.bodyB.label === "goal") ||
				(pair.bodyB.label === "boomy" && pair.bodyA.label === "goal")
			) {
				endParticleEmitter.start();
			}
		}
	});
};

export default setupEvents;