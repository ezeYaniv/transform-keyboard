export function buildOutput(finalKeyboard, strPos) {
	return strPos.map((pos) => finalKeyboard[pos]).join('');
}
