// **************************************** User Input Validation & Parsing ************************************
import { TRANSFORM_LEGEND } from './defineTransformations';

// validate keyboard transform string, then return an array of transform operations
export function parseTransform(keyTransform) {
	if (typeof keyTransform !== 'string') throw new Error('Keyboard transform must be a string!');
	if (keyTransform.length === 0) throw new Error('Transform is empty!');

	const transformRegex = /^(H|V|S-{0,1}\d+){1,3}$/;
	const transformIsValid = transformRegex.test(keyTransform);
	if (!transformIsValid)
		throw new Error(
			'Keyboard transform must contain only 0 or 1 uppercase H and/or 0 or 1 uppercase V and/or S(-)[1 or more 0-9 digits]'
		);

	const multiplesRegex = /(H){2,}|(V){2,}|(S-{0,1}\d+){2,}/;
	const containsMultiples = multiplesRegex.test(keyTransform);
	if (containsMultiples)
		throw new Error('Keyboard transform must not contain more than 1 of the same transform!');

	const parseRegex = /(H|V|S-{0,1}\d+)/g;
	return keyTransform
		.match(parseRegex)
		.map((key) => ({ func: TRANSFORM_LEGEND[key.slice(0, 1)], params: key.slice(1) }));
}

// validate userStr and index it
export function indexUserStr(userStr, keyboard) {
	if (userStr.length === 0) throw new Error('Input string is empty!');
	let strPos = [];
	let tempIdx;
	for (let char of userStr) {
		tempIdx = keyboard.indexOf(char);
		if (tempIdx === -1) {
			throw new Error(
				`"${char}" is not a character in our keyboard, please input a different string!`
			);
		}
		strPos.push(tempIdx);
	}
	return strPos;
}
