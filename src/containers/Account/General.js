import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Box,
  Typography,
  TextField,
  Button,
  Avatar
} from '@material-ui/core';
import { selectAuth, selectAuthItem } from 'store/selectors';
import { makeStyles } from '@material-ui/styles';
import { actionUpdateUser } from "store/actions";
import { useNavigate } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '20px'
  }
}));

export default function General() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentUser = useSelector(selectAuth);
  const updateSuccess = useSelector(selectAuthItem('updateSuccess'));
  const [userData, setUserData] = React.useState({
    id: 0,
    first_ame: '',
    last_name: '',
    username:'',
    email: ''
  })

  const handleChange = (type) => (event) => {
    setUserData(state => ({...state, [type]: event.target.value}))
  }

  const handleSave = () => {
    dispatch(actionUpdateUser(userData))
  }

  React.useEffect(() => {
    if(updateSuccess) {
      console.log(updateSuccess)
    }
  }, [updateSuccess]);

  React.useEffect(() => {
    if( currentUser ) {
      setUserData(currentUser);
    }
  }, [currentUser])

  return (
    <div className={classes.root}>
      <Typography variant="h5" noWrap style={{marginTop: '10px'}}>
        Personal Details
      </Typography>
      <Box style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', paddingTop: '20px' }}>
        <Box style={{ flex: 2 / 3, display: 'flex', flexDirection: 'column', width: '60%' }}>
          <TextField id="first_name" label="First Name" variant="outlined" style={{ margin: '10px' }} value={userData.first_name} onChange={handleChange('first_name')}/>
          <TextField id="last_name" label="Last Name" variant="outlined" style={{ margin: '10px' }} value={userData.last_name} onChange={handleChange('last_name')} />
          <TextField id="username" label="UserName" variant="outlined" style={{ margin: '10px' }} value={userData.username} onChange={handleChange('username')} />
          <Button variant="contained" color='primary' style={{ margin: '20px', textAlign: 'center' }} onClick={handleSave}>Save Change</Button>
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