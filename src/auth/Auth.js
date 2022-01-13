import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as Actions from 'store/actions';

import { bindActionCreators } from 'redux';
import jwtService from 'services/jwtService';

class Auth extends Component {

    constructor(props) {
        super(props);

        this.state = {
            checkingJwt: true
        };
    }

    onAutoLogin = () => {
        // call action to set userdata;
        jwtService.signInWithToken()
            .then(user => {
                this.props.setUserData(user);
                this.setState({ checkingJwt: false })
            })
    }
    onAutoLogout = () => {
        // call action to remove the user
        this.props.logout();
        this.setState({ checkingJwt: false })
    }

    componentDidMount() {
        jwtService.on("onAutoLogin", this.onAutoLogin);
        jwtService.on("onAutoLogout", this.onAutoLogout);
        jwtService.init();
    }

    componentWillUnmount() {
        jwtService.off("onAutoLogin", this.onAutoLogin);
        jwtService.off("onAutoLogout", this.onAutoLogout);
    }

    render() {
        const { children } = this.props;
        
        if (this.state.checkingJwt) return <div>Loading...</div>

        return <>
            {children}
        </>
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        logout: Actions.actionLogout,
        setUserData: Actions.actionSetUserData,
    }, dispatch);
}

export default connect(null, mapDispatchToProps)(Auth);
