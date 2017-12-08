import {
	INIT_COLORS,
	PICK_COLOR,
	ADD_MOVE,
	CHANGE_COLORS,
	CHANGE_SIZE
} from './types';

export function initColors() {
	return {
		type: INIT_COLORS
	};
}

export function pickColor(color) {
	return {
		type: PICK_COLOR,
		payload: color
	}
	addMove();
}

export function addMove() {
	return {
		type: ADD_MOVE
	}
}

export function changeColors(numColors) {
	return {
		type: CHANGE_COLORS,
		payload: numColors
	}
}

export function changeSize(size) {
	return {
		type: CHANGE_SIZE,
		payload: size
	}
}