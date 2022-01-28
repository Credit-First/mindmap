import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Box,
    IconButton,
    Menu,
    Button,
    MenuItem,
    Divider,
    Tooltip,
    ListItemIcon,
    ListItemText,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';
import CreateNewFolderIcon from '@material-ui/icons/CreateNewFolder';
import InputIcon from '@material-ui/icons/Input';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';

function CustomizedMenus(props) {
    const { onNewFolder } = props;

    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleNewFolder = () => {
        handleClose();
        onNewFolder();
    }
    const useStyles = makeStyles((theme) => ({
        Button: {
            textAlign: 'center',
            fontSize: '20px',
            '&:hover': {
                boxShadow: `0px 9px 20px -4px ${theme.palette.primary.dark}`,
            },
            boxShadow: 'none',
            borderRadius: '15px',
            padding: 0,
            margin: 0,
            flexGrow: 1,
            flexShrink: 1,
            height: '100px',
            width: '100%',
        }
    }));
    const navigate = useNavigate();
    const classes = useStyles();
    return (
        <div>
            <Button
                className={classes.Button}
                aria-controls="customized-menu"
                aria-haspopup="true"
                variant="contained"
                color="primary"
                onClick={handleClick}
            >
                <AddIcon style={{ width: '50px', height: '50px' }} />
            </Button>
            <Menu
                id="customized-menu"
                color='primary'
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                getContentAnchorEl={null}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
            >
                <MenuItem onClick={() => navigate('/mindmap')}>
                    <ListItemIcon>
                        <EditIcon />
                    </ListItemIcon>
                    <ListItemText primary="New mind map" />
                </MenuItem>
                <MenuItem onClick={handleClose}>
                    <ListItemIcon>
                        <InsertDriveFileIcon />
                    </ListItemIcon>
                    <ListItemText primary="New from template" />
                </MenuItem>
                <MenuItem onClick={handleNewFolder}>
                    <ListItemIcon>
                        <CreateNewFolderIcon />
                    </ListItemIcon>
                    <ListItemText primary="New folder" />
                </MenuItem>
                <Divider style={{ my: 0.5 }} />
                <MenuItem onClick={handleClose}>
                    <ListItemIcon>
                        <InputIcon />
                    </ListItemIcon>
                    <ListItemText primary="Import" />
                </MenuItem>
            </Menu>
        </div>
    );
}
function MoreMenu() {

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    return (
        <React.Fragment>
            <Box style={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
                <div style={{ minWidth: 30 }}>
                    <Tooltip title='sort'>
                        <IconButton
                            onClick={handleClick}
                            size="small"
                            style={{ ml: 2 }}
                            aria-controls={open ? 'sort-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? 'true' : undefined}
                        >
                            <MoreHorizIcon />
                        </IconButton>
                    </Tooltip>
                </div>
            </Box>
            <Menu
                anchorEl={anchorEl}
                getContentAnchorEl={null}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                id="sort-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                    elevation: 0,
                    style: {
                        overflow: 'visible',
                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                        borderRadius: 10,
                        marginTop: 1,
                        '&:before': {
                            content: '""',
                            display: 'block',
                            position: 'absolute',
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            bgcolor: 'background.paper',
                            transform: 'translateY(-50%) rotate(45deg)',
                            zIndex: 0,
                        },
                    },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                <MenuItem >
                    <ListItemText primary='Open' />
                </MenuItem>
                <MenuItem >
                    <ListItemText primary='Duplicate' />
                </MenuItem>
                <MenuItem >
                    <ListItemText primary='Move to trash' />
                </MenuItem>
                <MenuItem >
                    <ListItemText primary='Move' />
                </MenuItem>
                <MenuItem >
                    <ListItemText primary='Export' />
                </MenuItem>
                <MenuItem >
                    <ListItemText primary='Information' />
                </MenuItem>
            </Menu>
        </React.Fragment >
    );
}

export { CustomizedMenus,  MoreMenu }