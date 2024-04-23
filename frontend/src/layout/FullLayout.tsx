import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '@/store/hooks';

import { styled, Container, Box, useTheme } from '@mui/material';

import Header from '@/layout/Header';
import Footer from '@/layout/Footer'

const MainWrapper = styled('div')(({ theme }) => ({
    marginTop: '64px',
    backgroundColor: theme.palette.info.main,
    display: 'flex',
    flexDirection: 'column',
    minHeight: 'calc(100vh - 64px)',
}));


const FullLayout = () => {

    const theme = useTheme();
    const user = useAppSelector((state) => state.user)

    const { isAuthenticated, isVerified } = user;

    if (!isAuthenticated) {
        return <Navigate to="/login" />;
    }
    if (!isVerified) {
        return <Navigate to="/verify" />;
    }

    return (
        <MainWrapper>
            <Header />
            <Container
                sx={{
                    maxWidth: '100%!important',
                    backgroundColor: theme.palette.info.main,
                    flexGrow: 1
                }}
            >
                <Box sx={{ minHeight: 'calc(100vh - 170px)' }}>
                    <Outlet />
                </Box>
            </Container>

            <Footer />
        </MainWrapper>
    );
};

export default FullLayout;
