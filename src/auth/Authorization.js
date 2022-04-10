import React from "react";
import { useLocation, Navigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { Tune } from "@material-ui/icons";

class Authorization extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            accessGranted: true,
        }
    }

    static getDerivedStateFromProps(props, state) {
        const { location, user } = props;
        const { pathname, state: routeState } = location;
        
        let accessGranted = !!user;
        let redirect = null;

        if (user) {
            if (['/login', '/register'].includes(pathname)) {
                accessGranted = false;
                const redirectUrl = routeState && routeState.redirectUrl ? routeState.redirectUrl : '/';
                redirect = { to: redirectUrl }
            };
        } else {
            if (['/login', '/register'].includes(pathname)) accessGranted = true;
            else {
                redirect = { to: '/login', state: { redirectUrl: pathname } }
            }
        }

        return {
            accessGranted,
            redirect
        };
    }

    shouldComponentUpdate(nextProps, nextState) {
        return nextState.accessGranted !== this.state.accessGranted;
    }

    render() {
        const { children } = this.props;
        const { accessGranted, redirect } = this.state;
        // console.info('Fuse Authorization rendered', accessGranted);
        return accessGranted
            ? <React.Fragment>{children}</React.Fragment>
            : <Navigate to={redirect.to} state={redirect.state} />;
    }
}


export const withRouter = (Component) => {
    const Wrapper = (props) => {
        const location = useLocation();

        return (
            <Component
                location={location}
                {...props}
            />
        );
    };

    return Wrapper;
};

function mapStateToProps(state) {
    return {
        user: state.auth.currentUser
    }
}

export default withRouter(connect(mapStateToProps)(Authorization));