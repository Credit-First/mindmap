import * as React from 'react';
import {
    Button
} from '@material-ui/core';
import cx from 'classnames';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    main: {
        height: '100vh'
    },
    nav: {
        display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', alignItems: 'center', width: '100%', marginLeft: 'auto', marginRight: 'auto', padding: '10px 30px',
        '& .logo': {
            color: '#00AAFF', lineHeight: '140%', maxWidth: '100%',
            '& img': { width: '110px' }
        }
    },
    MenuBtn: {
        cursor: 'pointer',
        padding: '5px 20px',
        margin: '0 5px',
        fontSize: '18px',
        borderRadius: '45px',
        border: '1px solid transparent',
        '&:hover': {backgroundColor: '#f1f1f1', borderColor: '#f1f1f1', }
    },
    loginButton: { 
        fontWeight: 'bold', fontSize: '20px', borderRadius: 50, textTransform: 'capitalize'
    },
    signupButton: { 
        fontWeight: 'bold', fontSize: '20px', borderRadius: 50, boxShadow: `1px 1px 1px 1px`
    },
}));

export default function Home() {
    const classes = useStyles();
    const [navopen, setNavOpen] = React.useState(false);

    const handleToggle = () => {
        setNavOpen(!navopen);
    }

    return (
        <>
            <div className={cx(classes.nav, 'site-header')}>
                <a className='logo' href='' title='Mindmeister'>
                    <img src='assets/images/logo/logo.svg' alt='Mindmerster Logo' style={{padding: '5px'}}/>
                </a>
                <div id="menu-opener" className={cx('hamburger-toggle', (navopen && 'open'))} onClick={handleToggle}>
                    <div className="p-r h-a-center">
                        <span className="line first"></span>
                        <span className="line h-a-center second"></span>
                        <span className="line third"></span>
                    </div>
                </div>
                <div id='responsive-menu' className={cx('')} style={{ display: 'flex', alignItems: 'center' }}>
                    <div className={cx('')} style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                        <div>
                            <div className={cx(classes.MenuBtn)}>Products</div>
                        </div>
                        <div>
                            <div className={cx(classes.MenuBtn)}>Solutions</div>
                        </div>
                        <div>
                            <div className={cx(classes.MenuBtn)}>Pricing</div>
                        </div>
                        <div>
                            <div className={cx(classes.MenuBtn)}>Contact Sales</div>
                        </div>
                    </div>
                    <div className={cx('')} style={{ display: 'flex', justifyContent: 'space-end', alignItems: 'center' }}>
                        <div>
                            <Button
                                className={classes.loginButton}
                                color='primary'     
                            >
                                Log In
                            </Button>
                        </div>
                        <div>
                            <Button
                                className={classes.signupButton}
                                variant="contained"
                                color='primary'
                            >
                                Sign Up
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
            <div className='flex'>
                Body
            </div>
        </>
    )
}