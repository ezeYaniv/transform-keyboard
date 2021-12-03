import { Grid, Typography } from '@mui/material';

const Error = ({error}) => {
	return (
		<Grid>
      <Typography>
      Error: {error} Please fix your inputs and try again!
      </Typography>
    </Grid>
	);
};

export default Error;
