import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { LogoutResponse } from '@/utils/types';
import api from '@/http/server-base';

import {
    AppBar,
    Box,
    Divider,
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    Toolbar,
    Typography,
    Button,
    IconButton
} from '@mui/material'

import { FaAlignJustify } from "react-icons/fa";
import { setUser } from '@/store/slices/UserSlice';
import toast from 'react-hot-toast';
import { User } from '@/utils/types';


interface Props {
    window?: () => Window;
}

const drawerWidth = 240;
const navItems = [
    {
        text: 'Home',
        link: '/home'
    },
    {
        text: 'My Blogs',
        link: '/my-blogs'
    },

];

export default function Header(props: Props) {

    const navigate = useNavigate();
    const dispatch = useDispatch()

    const { window } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const user: User = useSelector((state: any) => state.user)

    const { isAuthenticated } = user;

    const handleLogout = async () => {
        try {
            const res = await api.get<LogoutResponse>(`logout`);

            
            if (res.success) {
                dispatch(setUser({
                    fullName: null,
                    email: null,
                    userImage: null,
                    isAuthenticated: false,
                    accessToken: null,
                }))
                navigate('/login')
            }
        } catch (error) {
            toast.error('Error in logout')
        }

    }

    const handleDrawerToggle = () => {
        setMobileOpen((prevState) => !prevState);
    };

    const drawer = (
        <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
            <Typography variant="h6" sx={{ my: 2 }}>
                Blogger
            </Typography>
            <Divider />
            <List>
                {navItems.map((item) => (
                    <Link key={item.link} to={item.link}>
                        <ListItem disablePadding>
                            <ListItemButton sx={{ textAlign: 'center' }}>
                                <ListItemText primary={item.text} />
                            </ListItemButton>
                        </ListItem>
                    </Link>
                ))}
            </List>
        </Box>
    );

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <Box sx={{ display: 'flex' }}>
            <AppBar component="nav">
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: 'none' } }}
                    >
                        <FaAlignJustify />
                    </IconButton>
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
                    >
                        Blogger
                    </Typography>
                    <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                        {navItems.map((item) => (
                            <Link key={item.link} to={`${item.link}`} >
                                <Button sx={{ color: '#fff' }}>
                                    {item.text}
                                </Button>
                            </Link>
                        ))}
                        {
                            isAuthenticated &&
                            <Button
                                sx={{ color: '#fff' }}
                                onClick={handleLogout}
                            >
                                Logout
                            </Button>
                        }
                    </Box>
                </Toolbar>
            </AppBar>
            <nav>
                <Drawer
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                >
                    {drawer}
                </Drawer>
            </nav>

        </Box>
    );
}
