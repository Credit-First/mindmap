import * as React from 'react';
import MediaQuery from "react-responsive";

function Responsive({ children, size }) {
    let query = '(min-width: 768px)';
    if (size === 'desktop') query = '(min-width: 1024px) ';
    if (size === 'mobile') query = '(min-device-width: 320px) and (max-width: 767px)';
    if (size === 'mobile+tablet') query = '(min-device-width: 320px) and (max-width: 1023px)';
    if (size === 'tablet+desktop') query = '(min-width: 768px)';
    if (size === 'tablet') query = '(min-width: 768px) and (max-width: 1023px)';
    return (
      <MediaQuery query={query}>
        {children}
      </MediaQuery>
    );
}

export default Responsive;