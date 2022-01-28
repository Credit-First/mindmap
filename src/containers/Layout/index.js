import React  from 'react';
import { Outlet } from 'react-router-dom';
import MindMap from '../../components/MindMapBox';
import SideBar from '../../components/layout/Sidebar';

export default function MainLayout() {
    return (
        <MindMap>
            <SideBar>
                <Outlet />
            </SideBar>
        </MindMap>
    )
}