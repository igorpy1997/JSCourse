import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    IconButton,
    Box,
    Drawer,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    useMediaQuery,
    useTheme,
    Container,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
} from '@mui/material';
import {
    Menu as MenuIcon,
    Home as HomeIcon,
    Public as PublicIcon,
    Person as PersonIcon,
    ContactMail as ContactIcon,
    Brightness4,
    Brightness7,
    DeleteSweep as DeleteSweepIcon,
} from '@mui/icons-material';
import { Link, useLocation } from 'react-router-dom';
import { useTheme as useCustomTheme } from '../../context/ThemeContext';
import { clearCompletedStart } from '../../store/slices/todoSlice';

const Layout = ({ children }) => {
    const [mobileOpen, setMobileOpen] = useState(false);
    const [clearDialogOpen, setClearDialogOpen] = useState(false);
    const location = useLocation();
    const muiTheme = useTheme();
    const { isDark, toggleTheme } = useCustomTheme();
    const isMobile = useMediaQuery(muiTheme.breakpoints.down('md'));
    const dispatch = useDispatch();

    const menuItems = [
        { text: 'Головна', path: '/', icon: <HomeIcon /> },
        { text: 'SWAPI', path: '/swapi', icon: <PublicIcon /> },
        { text: 'Про мене', path: '/about', icon: <PersonIcon /> },
        { text: 'Контакти', path: '/contacts', icon: <ContactIcon /> },
    ];

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const handleClearTodos = () => {
        dispatch(clearCompletedStart());
        setClearDialogOpen(false);
    };

    const drawer = (
        <Box sx={{ width: 250 }}>
            <Typography variant="h6" sx={{ p: 2, fontWeight: 'bold' }}>
                📋 Portfolio
            </Typography>
            <List>
                {menuItems.map((item) => (
                    <ListItem
                        key={item.text}
                        component={Link}
                        to={item.path}
                        onClick={() => setMobileOpen(false)}
                        sx={{
                            color: 'inherit',
                            textDecoration: 'none',
                            backgroundColor: location.pathname === item.path
                                ? muiTheme.palette.primary.main + '20'
                                : 'transparent',
                        }}
                    >
                        <ListItemIcon sx={{ color: 'inherit' }}>
                            {item.icon}
                        </ListItemIcon>
                        <ListItemText primary={item.text} />
                    </ListItem>
                ))}
            </List>
        </Box>
    );

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <AppBar position="static" elevation={2}>
                <Toolbar>
                    {isMobile && (
                        <IconButton
                            color="inherit"
                            edge="start"
                            onClick={handleDrawerToggle}
                            sx={{ mr: 2 }}
                        >
                            <MenuIcon />
                        </IconButton>
                    )}

                    <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
                        📋 My Portfolio
                    </Typography>

                    {!isMobile && (
                        <Box sx={{ display: 'flex', gap: 1 }}>
                            {menuItems.map((item) => (
                                <Button
                                    key={item.text}
                                    color="inherit"
                                    component={Link}
                                    to={item.path}
                                    startIcon={item.icon}
                                    variant={location.pathname === item.path ? 'outlined' : 'text'}
                                    sx={{
                                        borderColor: location.pathname === item.path ? 'white' : 'transparent',
                                    }}
                                >
                                    {item.text}
                                </Button>
                            ))}
                        </Box>
                    )}

                    <IconButton color="inherit" onClick={toggleTheme} sx={{ ml: 1 }}>
                        {isDark ? <Brightness7 /> : <Brightness4 />}
                    </IconButton>
                </Toolbar>
            </AppBar>

            {/* Mobile drawer */}
            <Drawer
                variant="temporary"
                open={mobileOpen}
                onClose={handleDrawerToggle}
                ModalProps={{ keepMounted: true }}
            >
                {drawer}
            </Drawer>

            {/* Main content */}
            <Box component="main" sx={{ flexGrow: 1, py: 3 }}>
                <Container maxWidth="lg">
                    {children}
                </Container>
            </Box>

            {/* Footer */}
            <Box
                component="footer"
                sx={{
                    bgcolor: 'primary.main',
                    color: 'primary.contrastText',
                    py: 3,
                    mt: 'auto',
                }}
            >
                <Container maxWidth="lg">
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
                        <Box>
                            <Typography variant="body1" sx={{ fontWeight: 600 }}>
                                Made with ❤️ using React, Redux & Material-UI
                            </Typography>
                            <Typography variant="caption" display="block" sx={{ mt: 0.5, opacity: 0.8 }}>
                                ⚡ Powered by Redux-Saga & Redux-Thunk
                            </Typography>
                        </Box>

                        {/* Clear TODO Button for Lesson 30 */}
                        <Button
                            variant="outlined"
                            color="inherit"
                            startIcon={<DeleteSweepIcon />}
                            onClick={() => setClearDialogOpen(true)}
                            sx={{
                                borderColor: 'white',
                                color: 'white',
                                textTransform: 'none',
                                '&:hover': {
                                    borderColor: 'white',
                                    backgroundColor: 'rgba(255,255,255,0.1)'
                                }
                            }}
                        >
                            Очистити TODO
                        </Button>
                    </Box>
                </Container>
            </Box>

            {/* Clear TODO Confirmation Dialog */}
            <Dialog
                open={clearDialogOpen}
                onClose={() => setClearDialogOpen(false)}
            >
                <DialogTitle>Очистити виконані завдання</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Ви впевнені, що хочете видалити всі виконані завдання?
                        Цю дію неможливо скасувати.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setClearDialogOpen(false)}>
                        Скасувати
                    </Button>
                    <Button onClick={handleClearTodos} variant="contained" color="error">
                        Очистити
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default Layout;