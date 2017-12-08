import _ from "lodash";
import {
	INIT_COLORS,
	PICK_COLOR,
	ADD_MOVE,
	CHANGE_COLORS,
	CHANGE_SIZE
} from "../actions/types";

export default function(
	state = {
		colors: [],
		blob: [0],
		currentColor: "",
		moves: 0,
		won: false,
		numColors: 5,
		size: 12,
		setRecord: false
	},
	action
) {
	switch (action.type) {
		case INIT_COLORS:
			let newArr = initBoard(state.numColors, state.size);
			return {
				...state,
				colors: newArr,
				moves: 0,
				currentColor: "",
				won: false
			};
		case CHANGE_COLORS:
			let colorChangedBoard = initBoard(action.payload, state.size);
			return {
				...state,
				colors: colorChangedBoard,
				numColors: action.payload,
				won: false,
				moves: 0
			};
		case CHANGE_SIZE:
			let sizeChangedBoard = initBoard(state.numColors, action.payload);
			resizeBoard(action.payload);
			return {
				...state,
				colors: sizeChangedBoard,
				size: action.payload,
				won: false,
				moves: 0
			};
		case PICK_COLOR:
			if (
				action.payload !== state.currentColor &&
				action.payload !== state.colors[0]
			) {
				let newMoves = state.moves;
				newMoves++;

				// Find adjacent squares and if they are the same color, find their adjacent squares. Repeat until all touching squares of same color are found and added to toChange.
				function checkSameColor(loc, index) {
					if (
						state.colors[loc] &&
						state.colors[loc] === state.colors[index]
					) {
						return true;
					} else {
						return false;
					}
				}

				function findToChange(arr) {
					let newArr = [];
					for (let i = 0; i < arr.length; i++) {
						newArr.push(arr[i]);
					}

					for (let i = 0; i < arr.length; i++) {
						let up = arr[i] - 12;
						let left = arr[i] - 1;
						let right = arr[i] + 1;
						let down = arr[i] + 12;

						if (
							checkSameColor(up, arr[i]) &&
							!_.includes(newArr, up)
						) {
							newArr.push(up);
						}
						if (
							checkSameColor(left, arr[i]) &&
							!_.includes(newArr, left) &&
							(left + 1) % 12 !== 0
						) {
							newArr.push(left);
						}
						if (
							checkSameColor(down, arr[i]) &&
							!_.includes(newArr, down)
						) {
							newArr.push(down);
						}
						if (
							checkSameColor(right, arr[i]) &&
							!_.includes(newArr, right)
						) {
							newArr.push(right);
						}
					}

					if (newArr.sort().join(",") !== arr.sort().join(",")) {
						return findToChange(newArr);
					} else {
						return newArr;
					}
				}

				let toChange = [0];
				toChange = findToChange(toChange);



				// Update colors
				let newColors = state.colors;
				for (let i = 0; i < toChange.length; i++) {
					newColors[toChange[i]] = action.payload;
				}

				let color = newColors[0];
				let sameColor = 0;
				for (let i = 0; i < state.colors.length; i++) {
					if (newColors[i] === color) {
						sameColor++;
					}
				}



				// Check for win and update relevant info if so
				let winColor = "blue";
				let newRecord = {};
				let winMoves;
				let setRecordNew = false;
				let won = state.won;

				// first line is for testing, second line is actual win logic
				// if (sameColor > 20) {
				if (state.won === false && sameColor === state.colors.length) {
					winMoves = state.moves;
					winMoves++;
					won = true;
					winColor = action.payload;
					const index = state.numColors;

					if (localStorage.getItem("record")) {
						const records = JSON.parse(
							localStorage.getItem("record")
						);
						newRecord = records;
						if (records[index]) {
							if (winMoves < records[index]) {
								newRecord[index] = winMoves;
								localStorage.setItem(
									"record",
									JSON.stringify(newRecord)
								);
								setRecordNew = true;
							}
						} else {
							newRecord[index] = winMoves;
							localStorage.setItem(
								"record",
								JSON.stringify(newRecord)
							);
						}
					} else {
						newRecord[index] = winMoves;
						localStorage.setItem(
							"record",
							JSON.stringify(newRecord)
						);
						setRecordNew = true;
					}
				}

				if(state.won === true) {
					winMoves = state.winMoves;
					newMoves = state.winMoves;
					winColor = action.payload;
				}

				return {
					...state,
					colors: newColors,
					currentColor: action.payload,
					moves: newMoves,
					won: won,
					winColor: winColor,
					setRecord: setRecordNew,
					winMoves: winMoves
				};
			}
	}
	return state;
}

function initBoard(numColors, size) {
	function randomColor() {
		const colorOptions = [
			"red",
			"yellow",
			"blue",
			"green",
			"orange",
			"purple",
			"aqua",
			"pink"
		];
		const color = colorOptions[Math.floor(Math.random() * numColors)];
		return color;
	}

	let colorArr = [];
	for (let i = 0; i < size * size; i++) {
		colorArr.push(randomColor());
	}

	return colorArr;
}

function resizeBoard(size) {
	const allSquares = document.querySelectorAll(".square");

	// set height and width depending on number of squares
	const numSquares = size * size;
	const boardLength = Math.sqrt(numSquares);
	const squarePerc = 100 / boardLength;
	document.querySelector(".square").style.width = `${squarePerc}%`;

	const totalHeight = $(".square-container").height();
	console.log(totalHeight);

	console.log(squarePerc, width);

	for (let i = 0; i < allSquares.length; i++) {
		allSquares[i].style.width = `${squarePerc}%`;
		allSquares[i].style.height = `${width}px`;
	}
}
