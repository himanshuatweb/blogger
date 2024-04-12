import { Box, Typography, Link, Stack } from '@mui/material';

const Footer = () => {
    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px', bgcolor: 'background.paper' }}>
            <Stack direction="row" spacing={2}>
                <Typography variant="body2" color="text.secondary" align="center">
                    Copyright © {new Date().getFullYear()} Blogger
                </Typography>
                <Link href="#" underline="none" color="grey">
                    Privacy Policy
                </Link>
                <Link href="#" underline="none" color="grey">
                    Terms of Use
                </Link>
            </Stack>
        </Box>
    );
};

export default Footer;
