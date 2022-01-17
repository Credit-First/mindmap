import React from "react";
import TopBar from "./TopBar";
import './Toolbar.css';

function Toolbar(props) {
  return (
    <div>
      <div style={{
        position: 'fixed',
        top: 0,
        right: 0,
        left: 0,
        zIndex: 9
      }}>
        <TopBar {...props} />
      </div>
    </div>
  );
}

export default Toolbar;
