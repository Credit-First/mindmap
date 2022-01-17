import * as React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function NotReady(props) {
    const location = useLocation();
    const navigate = useNavigate();

    const onClick = (url) => () => {
        navigate('/');
    }

    return (
        <div>
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <div style={{ fontSize: '30px', fontWeight: 'bold', margin: '20px' }}>
                    {`This page is not ready: ${location.pathname}`}
                </div>
                <a onClick={onClick('/')}>
                    Go to Main page.
                </a>
            </div>
        </div>
    )
}

export default NotReady;