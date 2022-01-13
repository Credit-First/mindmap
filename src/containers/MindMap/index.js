import * as React from 'react';
import TopBar from './TopBar';
import BottomBar from './BottomBar';
import LeftBar from './LeftBar';

export default function Mindmap() {
  return (
    <div>
      <TopBar/>
      <LeftBar />
      <BottomBar />
    </div>
  );
}


