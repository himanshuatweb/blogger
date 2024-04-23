import { Outlet, Navigate } from 'react-router-dom';
import { useAppSelector } from '@/store/hooks';
import { Container, Box, styled, useTheme } from '@mui/material';

import Footer from '@/layout/Footer'

const MainWrapper = styled('div')(({ theme }) => ({
    backgroundColor: theme.palette.info.main,
    display: 'flex',
    flexDirection: 'column',
}));

const BlankLayout = () => {

    const theme = useTheme();
    const user = useAppSelector((state) => state.user)

    const { isAuthenticated, isVerified } = user;

    if (isAuthenticated && isVerified) {
        return <Navigate to="/home" />
    }


    return (
        <MainWrapper>
            <Container
                sx={{
                    maxWidth: '100%!important',
                    backgroundColor: theme.palette.info.main,
                    flexGrow: 1,
                }}
            >
                <Box sx={{ minHeight: 'calc(100vh - 64px)' }}>
                    <Outlet />
                </Box>
            </Container>

            <Footer />
        </MainWrapper>
    );
};

export default BlankLayout;
