import { Grid, Typography } from '@mui/material';
import Key from './Key';
import { KEY_ROWS, KEYS_PER_ROW } from '../App';

const Keyboard = ({ keyboard, isFinal }) => {
	const keyboardArr = [];
	for (let i = 0; i < KEY_ROWS; i++) {
		keyboardArr.push(keyboard.slice(i * KEYS_PER_ROW, (i + 1) * KEYS_PER_ROW));
	}
	return (
		<Grid container justifyContent="center">
			<Grid item>
				<Typography variant="subtitle1">
					{isFinal ? 'Transformed keyboard:' : 'Initial keyboard:'}
				</Typography>
			</Grid>
			{keyboardArr.map((row, idx) => (
				<Grid key={idx} container justifyContent="center" alignItems="center">
					{row.map((key, idx) => (
						<Key key={idx}>{key}</Key>
					))}
				</Grid>
			))}
		</Grid>
	);
};
export default Keyboard;
