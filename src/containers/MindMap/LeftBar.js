import * as React from 'react';
import {
    IconButton,
    Box,
    Menu,
    MenuItem,
    Tooltip,

} from '@material-ui/core';
import FormatColorFillIcon from '@material-ui/icons/FormatColorFill';
import DeviceHubIcon from '@material-ui/icons/DeviceHub';
import SentimentSatisfiedAltIcon from '@material-ui/icons/SentimentSatisfiedAlt';

import Picker, { SKIN_TONE_MEDIUM_DARK } from 'emoji-picker-react';

export default function LeftBar() {
    return (
        <div style={{position: 'fixed', right: '5px', top: 'calc(100vh - 65%)', padding: '5px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', borderRadius: '40px', boxShadow: 'rgb(185 185 185) 0px 0px 9px 0px' }}>
                <IconButton>
                    <FormatColorFillIcon />
                </IconButton>
                <IconButton>
                    <FormatColorFillIcon />
                </IconButton>
                <EmojiMenu />
                <IconButton>
                    <DeviceHubIcon />
                </IconButton>
            </div>
        </div>
    )
}

function EmojiMenu() {
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
                <Tooltip title="Emoji">
                    <IconButton
                        onClick={handleClick}
                        aria-controls={open ? 'emoji' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                    >
                        <SentimentSatisfiedAltIcon />
                    </IconButton>
                </Tooltip>
            </Box>
            <Menu
                anchorEl={anchorEl}
                id="emoji"
                open={open}
                onClose={handleClose}
                PaperProps={{
                    elevation: 0,
                    sx: {
                        overflow: 'visible',
                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                        mt: 1.5,
                        '& .MuiAvatar-root': {
                            width: 32,
                            height: 32,
                        },
                        '&:before': {
                            content: '""',
                            display: 'block',
                            position: 'absolute',
                            top: 10,
                            right: -5,
                            width: 10,
                            height: 10,
                            bgcolor: 'background.paper',
                            transform: 'translateY(-50%) rotate(45deg)',
                            zIndex: 0,
                        },
                    },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'left', vertical: 'top' }}
            >
                <MenuItem style={{ padding: 0 }}>
                    <Box>
                        <Picker
                            onEmojiClick={handleClose}
                            disableAutoFocus={true}
                            skinTone={SKIN_TONE_MEDIUM_DARK}
                            groupNames={{ smileys_people: 'PEOPLE' }}
                            native
                        />
                    </Box>
                </MenuItem>
            </Menu>
        </React.Fragment>
    );
}