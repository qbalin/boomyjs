const Bodies = require("matter-js").Bodies;
const Constants = require("./constants");

const CELL_WIDTH = Constants.CELL_WIDTH,
	MAZE_X_OFFSET = Constants.MAZE_X_OFFSET,
	MAZE_Y_OFFSET = Constants.MAZE_Y_OFFSET,
	HORIZONTAL_CELL_COUNT = Constants.HORIZONTAL_CELL_COUNT,
	VERTICAL_CELL_COUNT = Constants.VERTICAL_CELL_COUNT;

const goal = Bodies.circle(
	MAZE_X_OFFSET + (HORIZONTAL_CELL_COUNT - 1 / 2) * CELL_WIDTH,
	MAZE_Y_OFFSET + (VERTICAL_CELL_COUNT - 1 / 2) * CELL_WIDTH,
	15,
	{
		isStatic: true,
		label: "goal",
		render: {
			strokeStyle: "#FFFF00",
			fillStyle: "#FFFF00",
			lineWidth: 1
		}
	}
);


let sign = 1;
setInterval(() => {
	let color = goal.render.fillStyle.slice(3,5)
	color = parseInt(color, 16);
	color += 10 * sign;

	if (color < 0) {
		color = 0;
		sign *= -1;
	}
	if (color > 255) {
		color = 255;
		sign *= -1;
	}
	color = color.toString(16);
	color = color.length === 1 ? `0${color}` : color
	goal.render.fillStyle = `#FF${color}00`
	goal.render.strokeStyle = `#FF${color}00`
}, 25)

module.exports = goal;