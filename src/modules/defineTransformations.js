import { KEY_ROWS, KEYS_PER_ROW } from '../App';
export const TRANSFORM_LEGEND = {
	H: flipHori,
	V: flipVert,
	S: shiftChars,
};

// **************************************** Keyboard Transformations ************************************
function flipHori(keyboard) {
	// loop through each row, loop through half the elements swapping each one with the corresponding element counting from the end
	for (let row = 0; row < KEY_ROWS; row++) {
		let i = 0;
		let j = KEYS_PER_ROW;
		while (i < j) {
			[keyboard[row * KEYS_PER_ROW + i], keyboard[row * KEYS_PER_ROW + j - 1]] = [
				keyboard[row * KEYS_PER_ROW + j - 1],
				keyboard[row * KEYS_PER_ROW + i],
			];
			i++;
			j--;
		}
	}
}
function flipVert(keyboard) {
	// loop through half the rows, swap each element in row i with the corresponding element in the last row
	let i = 0;
	let j = KEY_ROWS;
	while (i < j) {
		for (let currKey = 0; currKey < KEYS_PER_ROW; currKey++) {
			[keyboard[i * KEYS_PER_ROW + currKey], keyboard[(j - 1) * KEYS_PER_ROW + currKey]] = [
				keyboard[(j - 1) * KEYS_PER_ROW + currKey],
				keyboard[i * KEYS_PER_ROW + currKey],
			];
		}
		i++;
		j--;
	}
	return keyboard;
}
function shiftChars(keyboard, chars) {
	chars = parseInt(chars) % keyboard.length;

	const rotate = (i, j) => {
		while (i < j) {
			[keyboard[i], keyboard[j]] = [keyboard[j], keyboard[i]];
			i++;
			j--;
		}
	};
	if (chars > 0) {
		rotate(0, keyboard.length - 1);
		rotate(0, chars - 1);
		rotate(chars, keyboard.length - 1);
	}
	if (chars < 0) {
		rotate(0, keyboard.length - 1);
		rotate(0, keyboard.length - Math.abs(chars) - 1);
		rotate(keyboard.length - Math.abs(chars), keyboard.length - 1);
	}

	return keyboard;
}

// keyboard transformation driver code:
export function transformKeyboard(keyboard, transformOps) {
	// loop through the transform operations defined above, modify keyboard in-place, return the modified keyboard
	let finalKeyboard = keyboard;
	transformOps.forEach((op) => {
		op.func(finalKeyboard, op.params);
	});
	return finalKeyboard;
}
