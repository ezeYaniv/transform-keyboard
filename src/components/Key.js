import { Box } from '@mui/material';

const Key = (props) => {
	return (
		<Box
			sx={{
				width: 40,
				height: 40,
				backgroundColor: '#ddd',
        border: "1px solid gray",
        borderRadius: 1,
        margin: "1px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "default"
			}}
      component="span">
			{props.children}
		</Box>
	);
};

export default Key;
