import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  CssBaseline,
  Box,
  Typography,
  TextField,
  IconButton,
  Button,
  Checkbox,
  useMediaQuery,
  InputAdornment,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import PersonIcon from '@material-ui/icons/Person';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { actionRegister } from 'store/actions';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
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
    boxShadow: '0 1px 2px 0 rgb(0 0 0 / 10%)',
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
  signupButton: { width: '200px', borderRadius: 20 },
}))

export default function SignUp(props) {
  const classes = useStyles();
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const formRef = useRef();

  const matches = useMediaQuery('(min-width:800px)');

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);

  const registerSuccess = useSelector(selectAuthItem('registerSuccess'));

  useEffect(() => {
    if (registerSuccess) {
      navigate('/login');
    }
  }, [registerSuccess])

  const validationSchema = Yup.object().shape({
    firstName: Yup.string()
      .required('First Name is required'),
    lastName: Yup.string()
      .required('Last Name is required'),
    userName: Yup.string()
      .required('User Name is required'),
    email: Yup.string()
      .required('Email is required')
      .email('Email is invalid'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
    passwordConfirm: Yup.string()
      .min(6, 'PasswordConfirm must be at least 6 characters')
      .required('Password is required'),
    acceptTerms: Yup.bool()
      .oneOf([true], 'Accept Ts & Cs is required')
  });
  const formOptions = { resolver: yupResolver(validationSchema) };

  // get functions to build form with useForm() hook
  const { register, handleSubmit, formState } = useForm(formOptions);
  const { errors } = formState;
  function onSubmit(data) {
    dispatch(actionRegister(data));
    return false;
  }

  const registerLayer = (
    <form onSubmit={handleSubmit(onSubmit)} ref={formRef} style={{}}>
      <div style={{ display: 'flex', flexDirection: 'column', }}>
        <div style={{ display: 'flex' }}>
          <TextField
            name="first_name"
            label="Fisrt Name"
            placeholder='First Name'
            InputProps={{
              style: {
                borderRadius: '10px',
                height: '50px'
              },
              startAdornment: (
                <InputAdornment position="start">
                  <PersonIcon />
                </InputAdornment>
              ),
            }}
            {...register('firstName')}
            variant="outlined"
            error={errors.firstName ? true : false}
            helperText={errors.firstName?.message}
            color='secondary'
            style={{ marginRight: '10px' }}
          />
          <TextField
            name="last_name"
            label="Last Name"
            placeholder='Last Name'
            InputProps={{
              style: {
                borderRadius: '10px',
                height: '50px'
              },
              startAdornment: (
                <InputAdornment position="start">
                  <PersonIcon />
                </InputAdornment>
              ),
            }}
            {...register('lastName')}
            variant="outlined"
            error={errors.lastName ? true : false}
            helperText={errors.lastName?.message}
            color='secondary'
            style={{ marginTop: '0px' }}
          />
        </div>
        <TextField
          name="user_name"
          label="User Name"
          placeholder='User Name'
          InputProps={{
            style: {
              borderRadius: '10px',
              height: '50px'
            },
            startAdornment: (
              <InputAdornment position="start">
                <PersonIcon />
              </InputAdornment>
            ),
          }}
          {...register('userName')}
          variant="outlined"
          error={errors.userName ? true : false}
          helperText={errors.userName?.message}
          color='secondary'
          style={{ marginTop: '15px' }}
        />
        <TextField
          name="email"
          label="Email"
          placeholder='Type your Email'
          InputProps={{
            style: {
              borderRadius: '10px',
              height: '50px'
            },
            startAdornment: (
              <InputAdornment position="start">
                <AccountCircleIcon />
              </InputAdornment>
            ),
          }}
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
          placeholder='Type your Password'
          InputProps={{
            style: {
              borderRadius: '10px',
              height: '50px'
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
        <TextField
          name="passwordConfirm"
          label="PasswordConfirm"
          type={"password"}
          placeholder='Type your PasswordConfirm'
          InputProps={{
            style: {
              borderRadius: '10px',
              height: '50px'
            },
            startAdornment: (
              <InputAdornment position="start">
                <VpnKeyIcon />
              </InputAdornment>
            ),
          }}
          {...register('passwordConfirm')}
          variant="outlined"
          error={errors.passwordConfirm ? true : false}
          helperText={errors.passwordConfirm?.message}
          color='secondary'
          style={{ marginTop: '15px' }}
        />
        <div style={{ marginBottom: '20px' }}>
          <div style={{ display: 'flex', flexFlow: 'column', justifyContent: 'flex-start' }}>
            <label style={{ display: 'flex' }}>
              <div style={{ marginTop: '5px', fontSize: '15px' }}>
                <Checkbox name='acceptTerms' {...register('acceptTerms')} id='acceptTerms' style={{ inputProps: { ariaLabel: 'Checkbox demo' } }} />
                <span>I agree to the
                  <a href="">Term </a>
                  and
                  <a href=""> Privacy Poicy</a>
                </span>
                <Typography className='invalid-feedback' style={{ color: 'red', textAlign: 'center', fontSize: '15px' }}>{errors.acceptTerms?.message}</Typography>
              </div>
            </label>
          </div>
          <div style={{ display: 'flex', flexFlow: 'column', justifyContent: 'flex-start' }}>
            <label style={{ display: 'flex' }}>
              <div style={{
                display: 'flex', marginTop: '5px', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'flex-start', fontSize: '15px'
              }}>
                <Checkbox style={{ inputProps: { ariaLabel: 'Checkbox demo' } }} />
                <span>I agree to receive periodic product updates, offers, and promotions</span>
              </div>
            </label>
          </div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <Button
            className={classes.signupButton}
            type="submit"
            variant="contained"
            color='primary'
          >
            Sign Up
          </Button>
        </div>
      </div>
    </form>
  )

  return (
    <>
      <div component="nav" className={classes.nav}>
        <a className='logo' href='' title='Mindmeister'>
          <img src='assets/images/logo/logo.svg' alt='Mindmerster Logo' />
        </a>
        <div id='show-signup' className={classes.showSignup}>
          <span onClick={() => navigate('/login')} >Back</span>
        </div>
      </div>
      <Box component='main' style={{ maxWidth: '1024px', width: '100%', margin: '0 auto 20px auto' }}>
        <CssBaseline />
        <Box component='main' style={{ display: 'flex', flexDirection: 'column' }}>
          <div className='ui-message-bar'>
            <div id='site=flash-messages'></div>
          </div>
          <div className='signup-wrapper' style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', marginTop: '50px', padding: '0 20px' }}>
            <div className='align-items-center' style={{ width: '340px', display: 'flex', flexDirection: 'column', }}>
              <header>
                <h1 style={{ textAlign: 'center', fontWeight: 700, marginTop: 0 }}>Get Started</h1>
              </header>
              <h2 style={{ marginBottom: '20px', marginTop: 0, textAlign: 'center', fontSize: '21px', color: "#8A9499" }}>
                with one of these services
              </h2>
              <button
                type='submit'
                style={{
                  display: 'flex', textDecoration: 'none', padding: '11px 20px', borderRadius: '24px', boxShadow: '0 1px 2px 0 rgb(0 0 0 / 10%)', border: '1px solid rgba(0,0,0,0.1)', backgroundColor: 'white', height: 'auto', cursor: 'pointer', fontWeight: 700, fontSize: '17px', lineHeight: '24px', color: '#00AAFF', justifyContent: 'center'
                }}>
                <img
                  src='assets/images/logo/google_logo.svg' alt='google_logo'
                  style={{ borderEadius: '3px', width: '24px', height: '24px', marginRight: '10px' }}
                />
                <span>Sign up with Google</span>
              </button>
            </div>
            <div className='separator' style={{ position: 'relative', padding: '0 25px', ...(!matches && { backgroundColor: '#DCE2E6', height: '1px', margin: '70px 0', padding: 0, position: 'relative', textAlign: 'center', width: '100%' }) }}>
              <div className='vertical-line' style={{ backgroundColor: '#DCE2E6', width: '1px', height: '100%', position: 'absolute', left: '50%', transform: 'translateX(-50%)', ...(!matches && { textAlign: 'center' }) }}></div>
              <p style={{
                backgroundColor: '#DCE2E6',
                padding: '5px 10px',
                minWidth: '48px',
                borderRadius: '24px',
                fontSize: '24px',
                color: 'white',
                textAlign: 'center',
                display: 'inline-block',
                position: 'relative',
                margin: '100px 0',
                ...(!matches && { margin: 0, transform: 'translate(0, -50%)' })
              }}>
                or
              </p>
            </div>
            <div className='align-items-center' style={{ width: '340px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <img src="assets/images/logo/email.svg" alt='email' style={{ width: '60px', maxWidth: '60px', marginBottom: '10px' }} />
              <h2 style={{
                textAlign: 'center', fontSize: '21px', color: "#8A9499"
              }}>
                with your email address
              </h2>
              {registerLayer}
            </div>
          </div>
          <div className='justify-center' style={{ marginTop: '20px', marginBottom: '0px', textAlign: 'center', color: '#8A949' }}>
            <a href='' style={{ color: '#00AAFF', textDecoration: 'none', '&:hove': {} }}>I already have an account</a>
          </div>
        </Box>
      </Box>
    </>
  );
}