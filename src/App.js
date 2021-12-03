import { useState } from 'react';
import { Box } from '@mui/material';
import { transformKeyboard } from './modules/defineTransformations';
import { parseTransform, indexUserStr } from './modules/validateInput';
import { buildOutput } from './modules/buildOutput';
import Input from './components/Input';
import Keyboard from './components/Keyboard';
import Error from './components/Error';
import Answer from './components/Answer';

export const KEYS_PER_ROW = 10;
export const KEY_ROWS = 4;

function App() {
	const INIT_KEYBOARD = [
		'1',
		'2',
		'3',
		'4',
		'5',
		'6',
		'7',
		'8',
		'9',
		'0',
		'Q',
		'W',
		'E',
		'R',
		'T',
		'Y',
		'U',
		'I',
		'O',
		'P',
		'A',
		'S',
		'D',
		'F',
		'G',
		'H',
		'J',
		'K',
		'L',
		';',
		'Z',
		'X',
		'C',
		'V',
		'B',
		'N',
		'M',
		',',
		'.',
		'/',
	];
	const [keyboard, setKeyboard] = useState(INIT_KEYBOARD);
	const [error, setError] = useState(false);
	const [result, setResult] = useState('');
	const [initStr, setInitStr] = useState('');

	const handleSubmit = (userStr, keyTransform) => {
		try {
			const transformOps = parseTransform(keyTransform);
			const strPos = indexUserStr(userStr, keyboard);
			const finalKeyboard = transformKeyboard(keyboard, transformOps);
			setKeyboard(finalKeyboard);
			setInitStr(userStr);
			const result = buildOutput(finalKeyboard, strPos);
			setResult(result);
		} catch (err) {
			setError(err.message);
		}
	};

	const resetApp = () => {
		setKeyboard(INIT_KEYBOARD);
		setError(false);
		setResult('');
		setInitStr('');
	};

	return (
		<Box sx={{ marginTop: 10 }}>
			<Keyboard keyboard={keyboard} isFinal={!!result} />
			<Input
				handleSubmit={handleSubmit}
				keyboard={keyboard}
				isFinal={!!result}
				resetApp={resetApp}
			/>
			{error && <Error message={error} />}
			{result && <Answer initial={initStr} result={result} />}
		</Box>
	);
}

export default App;
