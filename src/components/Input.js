import React, { useState, useEffect } from 'react';
import { Button, TextField, Grid } from '@mui/material';
import { indexUserStr, parseTransform } from '../modules/validateInput';

const Input = ({ handleSubmit, keyboard, isFinal, resetApp }) => {
	const [inputData, setInputData] = useState({ inputString: '', transformation: '' });
	const [errorStr, setErrorStr] = useState('');
	const [errorTrans, setErrorTrans] = useState('');

	const handleChange = (e) => {
		setInputData({ ...inputData, [e.target.name]: e.target.value });
	};

	useEffect(() => {
		try {
			indexUserStr(inputData.inputString, keyboard);
			setErrorStr('');
		} catch (err) {
			setErrorStr(err.message);
		}
	}, [errorStr, inputData.inputString, keyboard]);

	useEffect(() => {
		try {
			parseTransform(inputData.transformation);
			console.log(parseTransform(inputData.transformation));
			setErrorTrans('');
		} catch (err) {
			setErrorTrans(err.message);
		}
	}, [inputData.transformation]);

	const handleClick = () => {
		handleSubmit(inputData.inputString, inputData.transformation);
	};

	const resetForm = () => {
		setInputData({ inputString: '', transformation: '' });
		setErrorStr('');
		setErrorTrans('');
		resetApp();
	};

	return (
		<Grid container justifyContent="center" sx={{ marginTop: 10 }}>
			<Grid item sx={{ marginRight: 2 }}>
				<TextField
					required
					error={!!errorStr}
					id="outlined-required"
					label="Input string"
					name="inputString"
					value={inputData.inputString}
					onChange={handleChange}
					helperText={errorStr}
				/>
			</Grid>
			<Grid item sx={{ marginRight: 2 }}>
				<TextField
					required
					error={!!errorTrans}
					id="outlined-required"
					label="Transformation"
					name="transformation"
					value={inputData.transformation}
					onChange={handleChange}
					helperText={errorTrans}
				/>
			</Grid>
			{isFinal ? (
				<Button variant="contained" onClick={resetForm}>
					Reset
				</Button>
			) : (
				<Button variant="contained" onClick={handleClick} disabled={!!errorStr || !!errorTrans}>
					Transform!
				</Button>
			)}
		</Grid>
	);
};

export default Input;
