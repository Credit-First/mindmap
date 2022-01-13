import * as React from 'react';
import { useSelector } from 'react-redux';
import {
  Box,
  Typography,
  TextField,
  Button,
  Avatar
} from '@material-ui/core';
import { selectAuthItem } from 'store/selectors';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '20px'
  }
}));

export default function General() {
  const classes = useStyles();
  const selectAuth = useSelector(selectAuthItem('currentUser'));
  const currentUser = selectAuth.data;

  return (
    <div className={classes.root}>
      <Typography variant="h5" noWrap style={{marginTop: '10px'}}>
        Personal Details
      </Typography>
      <Box style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', paddingTop: '20px' }}>
        <Box style={{ flex: 2 / 3, display: 'flex', flexDirection: 'column', width: '60%' }}>
          <TextField id="name" label="Name" variant="outlined" style={{ margin: '10px' }} />
          <TextField id="website" label="Website" variant="outlined" style={{ margin: '10px' }} />
          <TextField id="description" label="Description" variant="outlined" style={{ margin: '10px' }} />
          <Button variant="contained" color='primary' style={{ margin: '20px', textAlign: 'center' }}>Save Change</Button>
        </Box>
        <Box style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '40%' }}>
          <Avatar style={{ width: '130px', height: '130px', border: '5px double grey', '& img': { borderRadius: '100%' } }} src={currentUser.photoURL} />
          <div style={{ textAlign: 'center', marginTop: '10px' }}>
            My Avatar
          </div>
          <div style={{ width: '150px', textAlign: 'center', marginTop: '10px', color: 'grey' }}>
            Your photo should be cool and may use transparency.
          </div>
        </Box>
      </Box>
    </div>
  )
}