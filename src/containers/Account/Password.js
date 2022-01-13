import * as React from 'react';
import {
  Box,
  Typography,
  TextField,
  Button
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '20px'
  }
}));

export default function Password() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography variant="h5" noWrap style={{marginTop: '10px'}}>
        Password
      </Typography>
      <Box style={{ display: 'flex', flexDirection: 'column', width: '50%', margin: '30px' }}>
        <TextField id="newpassword" label="New Password" variant="outlined" style={{ margin: '10px' }} />
        <TextField id="confirmpassword" label="Confirm New Password" variant="outlined" style={{ margin: '10px' }} />
        <Button variant="contained" color='primary' style={{ margin: '20px', textAlign: 'center' }}>Save Change</Button>
      </Box>
      <Box>
        <Typography variant="h5" noWrap>
          Email
        </Typography>
        <div style={{margin: '30px', color: 'grey', lineHeight: 2}}>
          Email Address <br/>
          Please set a password above in order to be able to <br/>
          change your email
        </div>
        <TextField id="name" label="alexey.khlebnikov.com" variant="outlined" disabled={true} style={{ margin: '10px' }} />
      </Box>
    </div>
  )
}