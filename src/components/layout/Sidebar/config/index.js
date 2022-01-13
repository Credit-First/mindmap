import * as React from 'react';
import { useLocation, useNavigate, NavLink } from 'react-router-dom';
import {
    Box,
    ListItem,
    ListItemIcon,
    ListItemText,
    styled
} from '@material-ui/core';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import DeviceHubIcon from '@material-ui/icons/DeviceHub';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import StarOutlineIcon from '@material-ui/icons/StarOutline';
import LanguageIcon from '@material-ui/icons/Language';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import { withStyles } from '@material-ui/styles';

const defaultProps = {};

const styles = (theme) => ({
    root: {
        minHeight: 48,
        fontSize: 15,
        borderRadius: 0,
        cursor: 'pointer',
        marginBottom: '2px',
        '&.open': { borderRadius: '10px' },
        '&.active': {
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.secondary.contrastText + '!important',
            pointerEvents: 'none',
            '& .list-item-text-primary': {
                color: 'inherit'
            },
            '& .list-item-icon': {
                color: 'inherit'
            }
        },
        '&:hover': {
            backgroundColor: theme.palette.primary.light,
        },
        '& .list-item-icon': {},
        '& .list-item-text': {
            padding: '0 0 0 16px'
        },
        color: 'inherit!important',
        textDecoration: 'none!important',
    }
});

const NavBar = styled('nav', { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        padding: '15px',
        ...(!open && { padding: '15px 0' }),
    }),
);

const data = [
    {
        label: 'My map',
        link: '/dashboard',
        icon: <DeviceHubIcon />
    },
    {
        label: 'Recent',
        link: '/recent',
        icon: <AccessTimeIcon />
    },
    {
        label: 'Favorites',
        link: '/favorites',
        icon: <StarOutlineIcon />
    },
    {
        label: 'Public',
        link: '/public',
        icon: <LanguageIcon />
    },
    {
        label: 'Trash',
        link: '/trash',
        icon: <DeleteOutlineIcon />
    }
];

function CustomizedList({ classes, open }) {
    const location = useLocation();
    const navigate = useNavigate();

    return (
        <Box >
            <NavBar open={open}>
                {
                    data.map((item) => {
                        return (
                            <ListItem 
                                button
                                key={item.label}
                                component={NavLink}
                                to={item.link}
                                className={classNames(classes.root, { 'open': open, 'active': (location.pathname === item.link) })}
                                onClick={() => { }}
                            >
                                <ListItemIcon style={{ color: 'inherit', paddingRight: 1 }}>
                                    {item.icon}
                                </ListItemIcon>
                                <ListItemText
                                    primary={item.label}
                                    primaryTypographyProps={{ fontWeight: 'medium' }}
                                />
                            </ListItem>
                        )
                    })
                }
            </NavBar>
        </Box>
    );
}

CustomizedList.propTypes = {
};

export default withStyles(styles, { withTheme: true })(CustomizedList);