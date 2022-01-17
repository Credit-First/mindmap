import * as React from 'react';
import { IconButton, Button, Box} from '@material-ui/core';
import DeviceHubIcon from '@material-ui/icons/DeviceHub';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import RemoveIcon from '@material-ui/icons/Remove';
import CenterFocusStrongIcon from '@material-ui/icons/CenterFocusStrong';
import AddIcon from '@material-ui/icons/Add';

export default function BottomBar() {
    return (
        <Box style={{ margin: '10px', position: 'fixed', display: 'flex', bottom: 0 }}>
            <Box style={{borderRadius: '10px', display: 'flex', alignContent: 'center', boxShadow: 'rgb(185 185 185) 0px 0px 9px 0px' }}>
                <div>
                    <IconButton >
                        <DeviceHubIcon />
                    </IconButton>
                    <Button
                        variant='text'
                        color="primary"
                        style={{ color: 'black' }}
                        endIcon={<KeyboardArrowDownIcon />}
                    >
                        Mind Map
                    </Button>
                    <IconButton >
                        <RemoveIcon />
                    </IconButton>
                    <IconButton variant="outlined">
                        <AddIcon />
                    </IconButton>
                    <IconButton variant="outlined">
                        <CenterFocusStrongIcon />
                    </IconButton>
                </div>
            </Box>
        </Box>
    )
}