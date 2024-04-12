
import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

// A custom theme for this app
const theme = createTheme({
    palette: {
        // primary: {
        //     main: '#556cd6',
        // },
        // secondary: {
        //     main: '#19857b',
        // },
        error: {
            main: red.A200,
        },
        info: {
            main: '#f7f7f8'
        }
    },
});

export default theme;
