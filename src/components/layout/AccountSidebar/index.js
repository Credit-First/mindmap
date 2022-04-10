import * as React from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { styled, useTheme } from '@material-ui/core/styles';
import {
    Box,
    Button,
    Toolbar,
    CssBaseline,
    Typography,
    IconButton,
    Avatar,
    useMediaQuery,
    Drawer as MaterialDrawer,
    AppBar as MaterialAppBar,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';

import AccountSideBarList from './config';
import { routes } from '../../../setup/routes';
import { selectAuthItem } from 'store/selectors';

const drawerWidth = 240;

const openedMixin = (theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    backgroundColor: '#293033',
    color: 'white',
    overflowX: 'hidden',
});

const closedMixin = (theme) => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    backgroundColor: '#293033',
    color: 'white',
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)}px + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(7)}px + 1px)`,
    },
});

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: theme.spacing(3, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));

const AppBar = styled(MaterialAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    left: `calc(${theme.spacing(7)}px + 1px)`,
    width: `calc(100vw - ${theme.spacing(7)}px - 1px)`,
    ...(open && {
        marginLeft: drawerWidth,
        left: 0,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const Drawer = styled(MaterialDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        ...(open && {
            ...openedMixin(theme),
            '& .MuiDrawer-paper': openedMixin(theme),
        }),
        ...(!open && {
            ...closedMixin(theme),
            '& .MuiDrawer-paper': closedMixin(theme),
        }),
    }),
);

export default function AccountSidebar(props) {

    const [open, setOpen] = React.useState(true);

    const selectAuth = useSelector(selectAuthItem('currentUser'));
    const currentUser = selectAuth;

    const navigate = useNavigate();
    const matches = useMediaQuery('(min-width:800px)');

    const location = useLocation();

    function search(routes, path) {
        for (let i = 0; i < routes.length; i++) {
            const route = routes[i];
            if (route.path === path) return route;
            if (route.children) {
                let child_route = search(route.children, path);
                if (child_route) return child_route;
            }
        }
    }

    const currentRoute = search(routes, location.pathname);


    React.useEffect(() => {
        setOpen(matches);
    }, [matches]);

    const handleDrawerToggle = () => {
        setOpen(!open);
    };

    return (
        <Box style={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar position="fixed"
                open={open}
                style={{
                    backgroundColor: '#293033',
                    color: 'black',
                    boxShadow: 'none',
                }}
            >
                <Toolbar style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    backgroundColor: 'white',
                    minHeight: '64px',
                    borderTopLeftRadius: 20,
                    // ...(open && { borderTopLeftRadius: 20 })
                }}>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerToggle}
                        edge="start"
                        style={{
                            marginRight: '30px',
                            color: 'black',
                        }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Box style={{ display: 'flex', justifyContent: 'space-between', flex: '1' }}>
                        <Typography variant="h6" noWrap component="div">
                            {currentRoute.name}
                        </Typography>
                        <Typography variant="h6" noWrap component="div" style={{}}>
                            <Button onClick={() => navigate('/dashboard')}>Back to Mainpage</Button>
                        </Typography>
                    </Box>
                </Toolbar>
            </AppBar>
            <Drawer variant="permanent" open={open}>
                <DrawerHeader>
                    <div style={{ display: 'flex', width: '100%', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
                        <Avatar style={{
                            width: '130px', height: '130px', ...(!open && { width: '45px', height: '45px' }), mt: 2, border: '5px double grey', '& img': { borderRadius: '100%' },
                        }} src={currentUser.photoURL} />
                        <div style={{ marginTop: '30px', fontSize: '17px', ...(!open && { display: 'none' }) }} >{currentUser.username}</div>
                    </div>
                </DrawerHeader>
                <AccountSideBarList open={open} />
            </Drawer>
            {props.children}
        </Box>
    );
}