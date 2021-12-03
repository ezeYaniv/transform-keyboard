import { Grid, Typography } from '@mui/material';

const Answer = ({ initial, result }) => {
	return (
		<Grid
			container
			justifyContent="center"
			sx={{
				marginTop: 5,
			}}>
			<Typography>
				🎉 After transforming the keyboard, your input {initial} became {result}
			</Typography>
		</Grid>
	);
};

export default Answer;
