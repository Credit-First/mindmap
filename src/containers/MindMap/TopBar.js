import * as React from 'react';
import {
  Box,
  Button,
  IconButton,
  ListItemIcon,
  Avatar,
  Menu,
  MenuItem,
  Divider,
  Tooltip,
} from '@material-ui/core';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import StarOutlineIcon from '@material-ui/icons/StarOutline';
import AddIcon from '@material-ui/icons/Add';
import SearchIcon from '@material-ui/icons/Search';
import UndoIcon from '@material-ui/icons/Undo';
import RedoIcon from '@material-ui/icons/Redo';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import SettingsIcon from '@material-ui/icons/Settings';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import { withStyles } from '@material-ui/styles';
import PropTypes from 'prop-types';

const styles = {
  root: {
      padding: '7px'
  }
};

function IconBtnRaw(props) {
  const { classes, color, ...other } = props;
  return <IconButton className={classes.root} {...other} />;
}

IconBtnRaw.propTypes = {
  classes: PropTypes.object.isRequired,
  // color: PropTypes.oneOf(['blue', 'pink']).isRequired,
};

const IconBtn = withStyles(styles)(IconBtnRaw);

export default function TopBar() {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', margin: 10, }}>
      <Box component="div" style={{ flexGrow: 0, padding: '4px', borderRadius: '40px', display: 'flex', alignContent: 'center', boxShadow: 'rgb(185 185 185) 0px 0px 9px 0px' }}>
        <IconBtn>
          <ChevronLeftIcon />
        </IconBtn>
        <MapMenu />
        <IconBtn>
          <ErrorOutlineIcon />
        </IconBtn>
        <IconBtn>
          <CloudDownloadIcon />
        </IconBtn>
        <Button variant="contained" color='primary' startIcon={<StarOutlineIcon />} style={{ borderRadius: '40px' }}>Uprade Now</Button>
      </Box>
      <Box component="div" style={{ padding: '4px', borderRadius: '40px', display: 'flex', alignContent: 'center', boxShadow: 'rgb(185 185 185) 0px 0px 9px 0px' }}>
        <IconBtn style={{ backgroundColor: '#ffa000', color: 'white' }}>
          <AddIcon />
        </IconBtn>
        <IconBtn>
          <SearchIcon />
        </IconBtn>
        <IconBtn>
          <UndoIcon />
        </IconBtn>
        <IconBtn>
          <RedoIcon />
        </IconBtn>
        <Button variant="contained" color='primary' startIcon={<StarOutlineIcon />} style={{ borderRadius: '40px' }}>Invite</Button>
        <AccountMenu />
      </Box>
    </div>
  );
}

function AccountMenu() {
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
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            style={{ ml: 2 }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            <Avatar style={{ width: 32, height: 32 }}>M</Avatar>
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
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
        getContentAnchorEl={null}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem>
          <Avatar /> Profile
        </MenuItem>
        <MenuItem>
          <Avatar /> My account
        </MenuItem>
        <Divider />
        <MenuItem>
          <ListItemIcon>
            <PersonAddIcon fontSize="small" />
          </ListItemIcon>
          Add another account
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <SettingsIcon fontSize="small" />
          </ListItemIcon>
          Settings
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <ExitToAppIcon fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
}

function MapMenu() {
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
        <Tooltip title="Map settings">
          <Button
            onClick={handleClick}
            size="small"
            style={{ ml: 2 }}
            aria-controls={open ? 'map-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            variant='text'
            color="primary"
            style={{ color: 'black' }}
            endIcon={<KeyboardArrowDownIcon />}
          >
            My New Mind Map
          </Button>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="map-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
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
        <MenuItem>
          Recent Maps
        </MenuItem>
        <MenuItem>
          My New Mind Map
        </MenuItem>
        <MenuItem>
          Basic commands of Git
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
}

