import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  IconButton,
  ListItemText,
  ListItemIcon,
  Avatar,
  Menu,
  MenuItem,
  Divider,
  Tooltip,
  Typography,
  useMediaQuery
} from '@material-ui/core';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import StarOutlineIcon from '@material-ui/icons/StarOutline';
import AddIcon from '@material-ui/icons/Add';
import FolderOutlinedIcon from '@material-ui/icons/FolderOutlined';
import FileCopyOutlinedIcon from '@material-ui/icons/FileCopyOutlined';
import PaletteOutlinedIcon from '@material-ui/icons/PaletteOutlined';
import SearchIcon from '@material-ui/icons/Search';
import UndoIcon from '@material-ui/icons/Undo';
import RedoIcon from '@material-ui/icons/Redo';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import AddToPhotosIcon from '@material-ui/icons/AddToPhotos';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import SettingsIcon from '@material-ui/icons/Settings';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import FormatAlignJustifyIcon from '@material-ui/icons/FormatAlignJustify';
import FormatAlignLeftIcon from '@material-ui/icons/FormatAlignLeft';
import FormatAlignRightIcon from '@material-ui/icons/FormatAlignRight';
import { withStyles } from '@material-ui/styles';
import PropTypes from 'prop-types';

import defaultThemeImg from "../../../images/default.jpg";
import theme1Img from "../../../images/theme1.jpg";
import theme2Img from "../../../images/theme2.jpg";
import theme3Img from "../../../images/theme3.jpg";
import theme4Img from "../../../images/theme4.jpg";
import { browserOpenFile } from "@blink-mind/renderer-react";
import { downloadFile } from "../../../utils";
import { OpType } from "@blink-mind/core";
import { FOCUS_MODE_SEARCH } from "@blink-mind/plugins";
import { DiagramLayoutType } from "@blink-mind/core";

import { actionLogout } from 'store/actions';
import { selectAuthItem } from 'store/selectors';

const styles = {
  root: {
    padding: '7px'
  }
};

function IconBtnRaw(props) {
  const { classes, color, title = '', ...other } = props;
  return (
    <Tooltip title={title}>
      <IconButton className={classes.root} {...other} />
    </Tooltip>
  )
}

IconBtnRaw.propTypes = {
  classes: PropTypes.object.isRequired,
  // color: PropTypes.oneOf(['blue', 'pink']).isRequired,
};

const IconBtn = withStyles(styles)(IconBtnRaw);

export default function TopBar(props) {
  const navigate = useNavigate();
  const matches = useMediaQuery('(min-width:900px)');
  const [match, setMatch] = React.useState(matches);
  React.useEffect(() => {
    setMatch(matches);
  }, [matches]);

  const { diagram, onClickUndo, onClickRedo } = props;


  const onClickAddChild = e => {
    const { diagram } = props;
    const diagramProps = diagram.getDiagramProps();
    const { controller } = diagramProps;

    controller.run("add", diagramProps);
  };

  const onClickOpenFile = e => {
    const { diagram } = props;
    const diagramProps = diagram.getDiagramProps();
    const { controller } = diagramProps;
  
    browserOpenFile(".json,.blinkmind,.bm").then(txt => {
      let obj = JSON.parse(txt);
      let model = controller.run("deserializeModel", { controller, obj });
      diagram.openNewModel(model);
    });
  };

  const onClickExportJson = e => {

    const { diagram } = props;
    const diagramProps = diagram.getDiagramProps();
    const { controller, model } = diagramProps;

    const json = controller.run("serializeModel", diagramProps);
    const jsonStr = JSON.stringify(json);

    const url = `data:text/plain,${encodeURIComponent(jsonStr)}`;
    const title = controller.run("getTopicTitle", {
      ...diagramProps,
      topicKey: model.rootTopicKey
    });
    downloadFile(url, `${title}.blinkmind`);
  };

  const onClickSearch = e => {
  const { diagram } = props;
  const diagramProps = diagram.getDiagramProps();
  const { controller } = diagramProps;

    controller.run("operation", {
      ...diagramProps,
      opType: OpType.SET_FOCUS_MODE,
      focusMode: FOCUS_MODE_SEARCH
    });
  };
  return (
    <div style={{ display: 'flex', ...(!match && { flexDirection: 'column' }), justifyContent: 'space-between', margin: '10px 20px', }}>
      <Box component="div" style={{ backgroundColor: 'white', flexGrow: 0, padding: '4px', ...(!matches && { marginBottom: '10px ' }), borderRadius: '40px', display: 'flex', alignContent: 'center', boxShadow: 'rgb(185 185 185) 0px 0px 9px 0px' }}>
        <IconBtn onClick={() => navigate('/dashboard')}>
          <ChevronLeftIcon />
        </IconBtn>
        <MapMenu />
        <IconBtn>
          <ErrorOutlineIcon />
        </IconBtn>
        <IconBtn>
          <CloudDownloadIcon />
        </IconBtn>
        <Button variant="contained" color='primary' startIcon={<StarOutlineIcon />} style={{ borderRadius: '40px', boxShadow: 'none' }}>Uprade Now</Button>
      </Box>
      <Box style={{ display: 'flex', alignContent: 'center' }}>
        <IconBtn title='Add'  onClick={onClickAddChild} style={{ margin: '3px', marginRight: '10px', backgroundColor: '#ffa000', color: 'white', boxShadow: 'rgb(185 185 185) 0px 0px 9px 0px' }}>
          <AddIcon/>
        </IconBtn>
        <Box component="div" style={{ flex: 1, backgroundColor: 'white', padding: '4px', borderRadius: '40px', display: 'flex', alignContent: 'center', boxShadow: 'rgb(185 185 185) 0px 0px 9px 0px' }}>
          <IconBtn title='Open folder' onClick={onClickOpenFile} >
            <FolderOutlinedIcon />
          </IconBtn>
          <IconBtn title='Export Json file' onClick={onClickExportJson}>
            <FileCopyOutlinedIcon />
          </IconBtn>
          <LayoutMenu title='Layout setting' diagram={diagram} />
          <ThemeMenu title='Theme setting' diagram={diagram} />
          <IconBtn title='Search' onClick={onClickSearch}>
            <SearchIcon />
          </IconBtn>
          <IconBtn title='Undo' onClick={onClickUndo}>
            <UndoIcon />
          </IconBtn>
          <IconBtn title='Redo' onClick={onClickRedo}>
            <RedoIcon />
          </IconBtn>
          <Button variant="contained" color='primary' startIcon={<StarOutlineIcon />} style={{ borderRadius: '40px', boxShadow: 'none' }}>Invite</Button>
          <AccountMenu />
        </Box>
      </Box>
    </div>
  );
}
function ThemeMenu(props) {
  const { diagram } = props;
  const diagramProps = diagram.getDiagramProps();
  const { controller } = diagramProps;

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const onClickSetTheme = themeKey => e => {
    controller.run("setTheme", { ...diagramProps, themeKey });
  };

  const themes = [
    ["default", defaultThemeImg],
    ["theme1", theme1Img],
    ["theme2", theme2Img],
    ["theme3", theme3Img],
    ["theme4", theme4Img]
  ];

  return (
    <React.Fragment>
      <Box style={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
        <IconBtn
          aria-controls="theme-menu"
          aria-haspopup="true"
          onClick={handleClick}
          aria-controls={open ? 'map-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          variant='text'
        >
          <PaletteOutlinedIcon />
        </IconBtn>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="theme-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        getContentAnchorEl={null}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'center', vertical: 'bottom' }}
      >
        {themes.map(theme => (
          <MenuItem
            key={theme[0]}
            onClick={onClickSetTheme(theme[0])}
          >
            <img src={theme[1]} alt={theme[0]} style={{ width: '350px', height: '80px' }} />
          </MenuItem>
        ))}
      </Menu>
    </React.Fragment>
  );
}
function LayoutMenu(props) {
  const { diagram } = props;
  const diagramProps = diagram.getDiagramProps();
  const { controller } = diagramProps;

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const onClickSetLayout = layoutDir => e => {
    controller.run("setLayoutDir", { ...diagramProps, layoutDir });
  };

  const layoutDirs = [
    [
      DiagramLayoutType.LEFT_AND_RIGHT,
      "Left And Right",
      <FormatAlignJustifyIcon />
    ],
    [DiagramLayoutType.LEFT_TO_RIGHT, "Only Right", <FormatAlignRightIcon />],
    [DiagramLayoutType.RIGHT_TO_LEFT, "Only Left", <FormatAlignLeftIcon />]
  ];

  return (
    <React.Fragment>
      <Box style={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
        <IconBtn
          aria-controls="layout-menu"
          aria-haspopup="true"
          onClick={handleClick}
          aria-controls={open ? 'map-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          variant='text'
        >
          <FormatAlignJustifyIcon />
        </IconBtn>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="layout-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        getContentAnchorEl={null}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'center', vertical: 'bottom' }}
      >
        {layoutDirs.map(dir => (
          <MenuItem
            key={dir[1]}
            onClick={onClickSetLayout(dir[0])}
          >
            <ListItemIcon>
              {dir[2]}
            </ListItemIcon>
            {dir[1]}
          </MenuItem>
        ))}
      </Menu>
    </React.Fragment>
  );
}
function AccountMenu() {
  const selectAuth = useSelector(selectAuthItem('currentUser'));
  const currentUser = selectAuth.data;

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogout = () => {
    dispatch(actionLogout());
  }
  return (
    <React.Fragment>
      <Box style={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
        <Tooltip title={currentUser.displayName}>
          <IconButton
            onClick={handleClick}
            size="small"
            style={{ ml: 2 }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            <Avatar style={{ width: 32, height: 32 }} alt={currentUser.displayName} src={currentUser.photoURL}></Avatar>
          </IconButton>
        </Tooltip>
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
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          style: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
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
        <Box style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Avatar style={{ marginTop: '10px', width: '80px', height: '80px', border: '1px solid grey', '& img': { borderRadius: '100%' } }} src={currentUser.photoURL} />
          <div style={{ margin: '15px', fontSize: '20px' }}>{currentUser.displayName}</div>
          <div style={{
            padding: '0px 20px',
            width: '250px',
            fontSize: '17px',
            lineHeight: '25px',
            fontWeight: 400,
            letterSpacing: 'normal',
            color: 'rgb(138, 148, 153)',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            textAlign: 'center',
            marginBottom: '10px'
          }}>{currentUser.email}</div>
        </Box>
        <MenuItem onClick={() => navigate('/account/me')}>
          <ListItemIcon>
            <AccountCircleIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary='Account' />
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <SettingsIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary='Preferences' />
        </MenuItem>
        <Divider />
        <MenuItem>
          <ListItemIcon>
            <HelpOutlineIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary='Help' />
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <AddToPhotosIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary='Apps' />
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <FavoriteBorderIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary='Spread the love' />
        </MenuItem>
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <ExitToAppIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary='Logout' />
        </MenuItem>
      </Menu>
    </React.Fragment >
  );
}
function MapMenu() {
  const navigate = useNavigate();
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
        getContentAnchorEl={null}
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
        <MenuItem disabled>
          Recent Maps
        </MenuItem>
        <MenuItem onClick={()=>navigate('/')}>
          My New Mind Map
        </MenuItem>
        <MenuItem >
          Basic commands of Git
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
}

