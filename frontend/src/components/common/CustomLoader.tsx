import { Box, CircularProgress } from "@mui/material"

const CustomLoader = () => {
    return (
        <Box sx={{
            display: 'flex',
            height: '80vh',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            <CircularProgress />
        </Box>
    )
}

export default CustomLoader