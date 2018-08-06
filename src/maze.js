import { Bodies } from "matter-js";
import { CELL_WIDTH, MAZE_Y_OFFSET, MAZE_X_OFFSET, HORIZONTAL_CELL_COUNT, VERTICAL_CELL_COUNT } from "./constants";
import createMaze from "generate-maze";


const maze = createMaze(HORIZONTAL_CELL_COUNT, VERTICAL_CELL_COUNT);
console.log(maze);

const WALL_WIDTH = 5;
const WALL_SECTIONS_AMOUNT = 1;
const WALL_SECTIONS_LENGTH = (CELL_WIDTH + WALL_WIDTH) / WALL_SECTIONS_AMOUNT;


const generateMaze = () => {
	const walls = [];

	maze.forEach(line =>
		line.forEach(cell => {
			// Top Left coordinate of the cell
			let y = cell.y * CELL_WIDTH + MAZE_Y_OFFSET;
			let x = cell.x * CELL_WIDTH + MAZE_X_OFFSET;

			if (cell.top) {
				for (let i = 0; i < WALL_SECTIONS_AMOUNT; ++i) {
					walls.push(
						Bodies.rectangle(x + i * WALL_SECTIONS_LENGTH + (WALL_SECTIONS_LENGTH - WALL_WIDTH) / 2, y, WALL_SECTIONS_LENGTH, WALL_WIDTH, {
							isStatic: true,
							label: "wall",
							render: {
								strokeStyle: "transparent",
								fillStyle: "transparent",
								lineWidth: 1
							}
						})
					);
				}
			}

			if (cell.bottom) {
				for (let i = 0; i < WALL_SECTIONS_AMOUNT; ++i) {
					walls.push(
						Bodies.rectangle(x + i * WALL_SECTIONS_LENGTH + (WALL_SECTIONS_LENGTH - WALL_WIDTH) / 2, y + CELL_WIDTH, WALL_SECTIONS_LENGTH, WALL_WIDTH, {
							isStatic: true,
							label: "wall",
							render: {
								strokeStyle: "transparent",
								fillStyle: "transparent",
								lineWidth: 1
							}
						})
					);
				}
			}

			if (cell.right) {
				for (let i = 0; i < WALL_SECTIONS_AMOUNT; ++i) {
					walls.push(
						Bodies.rectangle(x + CELL_WIDTH, y + i * WALL_SECTIONS_LENGTH + (WALL_SECTIONS_LENGTH - WALL_WIDTH) / 2, WALL_WIDTH, WALL_SECTIONS_LENGTH, {
							isStatic: true,
							label: "wall",
							render: {
								strokeStyle: "transparent",
								fillStyle: "transparent",
								lineWidth: 1
							}
						})
					);
				}
			}

			if (cell.left) {
				for (let i = 0; i < WALL_SECTIONS_AMOUNT; ++i) {
				walls.push(
					Bodies.rectangle(x, y + i * WALL_SECTIONS_LENGTH + (WALL_SECTIONS_LENGTH - WALL_WIDTH) / 2, WALL_WIDTH, WALL_SECTIONS_LENGTH, {
						isStatic: true,
						label: "wall",
						render: {
							strokeStyle: "transparent",
							fillStyle: "transparent",
							lineWidth: 1
						}
					})
				);
			}
			}
		})
	);

	return walls;
};

export default generateMaze;