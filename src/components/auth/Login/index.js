import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import Recaptcha from "react-google-invisible-recaptcha";
import * as Yup from 'yup';
import {
  Button,
  Paper,
  Box,
  Grid,
  TextField,
  Checkbox,
  Snackbar,
  IconButton,
  InputAdornment
} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';

import CloseIcon from '@material-ui/icons/Close';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';

import Responsive from '../../layout/Responsive';
import { actionLogin } from 'store/actions';
import { selectAuthItem } from 'store/selectors';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  main: {
    height: '100vh'
  },
  nav: {
    display: 'flex', flexWrap: 'wrap', alignItems: 'center', width: '100%', marginLeft: 'auto', marginRight: 'auto', padding: '20px 30px',
    '& .logo': {
      color: '#00AAFF', lineHeight: '140%', maxWidth: '100%',
      '& img': { width: '110px' }
    }
  },
  showSignup: {
    flex: 1, display: 'flex', justifyContent: 'flex-end',
    '& span': { cursor: 'pointer', color: '#00AAFF', textDecoration: 'none', '&:hove': {} }
  },
  section: {
    alignItems: 'center',
    paddingTop: '10px',
    display: 'flex',
    flexFlow: 'column',
    justifyContent: 'flex-start',
    padding: '30px 40px',
    position: 'relative',
    '& form': { textAlign: 'center' },
    '& h2': { marginBottom: '20px', marginTop: '20px', textAlign: 'center', fontSize: '21px', color: 'grey' }
  },
  loginGoogle: {
    display: 'flex',
    margin: 'auto',
    textDecoration: 'none',
    padding: '11px 20px',
    borderRadius: '24px',
    boxShadow: '0px 3px 1px -2px rgb(0 0 0 / 20%)',
    border: '1px solid rgba(0,0,0,0.1)',
    backgroundColor: 'white',
    height: 'auto',
    cursor: 'pointer',
    fontWeight: 700,
    fontSize: '17px',
    lineHeight: '24px',
    color: '#00AAFF',
    '& img': {
      borderEadius: '3px',
      width: '24px',
      height: '24px',
      marginRight: '10px',
    },
  },
  rememberButton: {
    marginBottom: '15px',
    display: 'flex',
    flexWrap: 'nowrap',
    alignItems: 'center',
    marginTop: '10px'
  },
  loginButton: { width: '200px', borderRadius: 20 },
}))

function Copyright(props) {
  return (
    <div color="text.secondary" align="center" {...props} style={{ marginTop: '30px' }}>
      {'Copyright © '}
      <Link to="https://Mindmeister.com/">
        MindMeister
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </div>
  );
}

export default function SignInSide(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const formRef = useRef();
  const [showPassword, setShowPassword] = useState(false);
  const [recaptcha, setRecaptcha] = useState(null);
  const [snackPack, setSnackPack] = useState([]);
  const [snackOpen, setSnackOpen] = useState(false);
  const [messageInfo, setMessageInfo] = useState(undefined);

  const loginResult = useSelector(selectAuthItem('error'));
  const registerSuccess = useSelector(selectAuthItem('registerSuccess'));

  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .required('Email is required')
      .email('Email is invalid'),
    password: Yup.string()
      .required('Password is required'),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };

  // get functions to build form with useForm() hook
  const { register, handleSubmit, formState } = useForm(formOptions);
  const { errors } = formState;

  function onSubmit(data) {
    // dispatch(actionLogin(data));
    // recaptcha.reset();
    sendRecaptcha();
  }

  function sendRecaptcha() {
    recaptcha.execute();
  }

  function onResolved() {
    // Process Data //
    handleSubmit((data) => dispatch(actionLogin(data)))();
    return
  }

  useEffect(() => {
    const email = loginResult.email;
    const password = loginResult.password;
    if (email) setSnackPack((prev) => [...prev, { message: email, key: new Date().getTime() }]);
    else if (password) setSnackPack((prev) => [...prev, { message: password, key: new Date().getTime() }]);

  }, [loginResult])

  useEffect(() => {
    if(registerSuccess) {
      setSnackPack((prev) => [...prev, { message: 'Success Register', key: new Date().getTime() }]);
    }
  }, [registerSuccess])
  
  useEffect(() => {
    if (snackPack.length && !messageInfo) {
      // Set a new snack when we don't have an active one
      setMessageInfo({ ...snackPack[0] });
      setSnackPack((prev) => prev.slice(1));
      setSnackOpen(true);
    } else if (snackPack.length && messageInfo && snackOpen) {
      // Close an active snack when a new one is added
      setSnackOpen(false);
    }
  }, [snackPack, messageInfo, snackOpen]);

  const handleSnackClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackOpen(false);
  };

  const handleSnackExited = () => {
    setMessageInfo(undefined);
  };

  const loginLayer = (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <TextField
        name="email"
        label="Email"
        placeholder='Type your Email'
        InputProps={{
          style: {
            borderRadius: '15px',
          },
          startAdornment: (
            <InputAdornment position="start">
              <AccountCircleIcon />
            </InputAdornment>
          ),
        }}
        autoComplete="off"
        {...register('email')}
        variant="outlined"
        error={errors.email ? true : false}
        helperText={errors.email?.message}
        color='secondary'
        style={{ marginTop: '15px' }}
      />
      <TextField
        name="password"
        label="Password"
        type={showPassword ? "text" : "password"}
        placeholder='Type our Password'
        InputProps={{
          style: {
            borderRadius: '15px'
          },
          startAdornment: (
            <InputAdornment position="start">
              <VpnKeyIcon />
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
              >
                {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
              </IconButton>
            </InputAdornment>
          )
        }}
        {...register('password')}
        variant="outlined"
        error={errors.password ? true : false}
        helperText={errors.password?.message}
        color='secondary'
        style={{ marginTop: '15px' }}
      />
    </div>
  )

  const bodylayer = (
    <>
      <div component="nav" className={classes.nav}>
        <a className='logo' href='https://www.mindmeister.com' title='Mindmeister'>
          <img src='assets/images/logo/logo.svg' alt='Mindmerster Logo' />
        </a>
        <div id='show-signup' className={classes.showSignup}>
          <span onClick={() => navigate('/register')} >Sign Up</span>
        </div>
      </div>
      <Box>
        <Box
          component="main"
          autoComplete="off"
        >
          <div>
            <div id="site-flash-messages">
            </div>
          </div>
          <div>
            <h1 style={{ textAlign: 'center', fontWeight: 700 }}>Log In</h1>
          </div>
          <Box
            component={'section'} className={classes.section}
          >
            <form onSubmit={handleSubmit(onSubmit)} ref={formRef}>
              <button type="submit" className={classes.loginGoogle}>
                <img src="assets/images/logo/google_logo.svg" alt='google_logo'/>
                <span>Log in with Google</span>
              </button>
              <h2>
                or with your MindMeister account
              </h2>
              {loginLayer}
              <div className={classes.rememberButton} >
                <Checkbox style={{ inputProps: { ariaLabel: 'Checkbox demo' } }} />
                <span>Remember me</span>
              </div>
              <Button
                type="submit"
                variant="contained"
                className={classes.loginButton}
                color='secondary'
              >
                Log In
              </Button>
              <Copyright />
            </form>
          </Box>
        </Box>
      </Box>
    </>
  );

  const getLoginLayout = isMobile =>
    <Grid container component="main" className={classes.main}>
      {
        isMobile ?
          <>
            <Grid
              item
              xs={false}
              sm={4}
              md={7}
              style={{
                backgroundImage: 'url(https://source.unsplash.com/random)',
                backgroundRepeat: 'no-repeat',
                backgroundColor: (t) =>
                  t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            />
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
              {bodylayer}
            </Grid>

          </>
          :
          <Box style={{ width: '100%' }}>
            {bodylayer}
          </Box>
      }
      <Recaptcha
        ref={ref => setRecaptcha(ref)}
        secureKey="6LfTw_4dAAAAAHOjPrtusI5alBPpYu2lW5yW7P1n"
        sitekey="6LfTw_4dAAAAAJWeqtDrom6-GCX2ujbX6BDxRNU0"
        onResolved={onResolved}
      />
      <Snackbar
        anchorOrigin={{
          vertical: "top",
          horizontal: "center"
        }}
        key={messageInfo ? messageInfo.key : undefined}
        open={snackOpen}
        autoHideDuration={6000}
        onClose={handleSnackClose}
        TransitionProps={{ onExited: handleSnackExited }}
        action={
          <React.Fragment>
            <IconButton
              aria-label="close"
              color="white"
              style={{ p: 0.5 }}
              onClick={handleSnackClose}
            >
              <CloseIcon />
            </IconButton>
          </React.Fragment>
        }
      >
        <Alert onClose={handleSnackClose} severity="error" style={{ width: '100%' }}>
          {messageInfo ? messageInfo.message : undefined}
        </Alert>
      </Snackbar>
    </Grid >;

  return (
    <>
      <Responsive size="mobile+tablet">
        {getLoginLayout(false)}
      </Responsive>
      <Responsive size="desktop">
        {getLoginLayout(true)}
      </Responsive>
    </>
  );
}
