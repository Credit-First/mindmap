import React  from 'react';
import { Outlet } from 'react-router-dom';
import MindMap from '../../components/MindMapBox';
import AccountSidebar from '../../components/layout/AccountSidebar';
import Footer from '../../components/layout/Footer';

export default function MainLayout() {
    return (
        <MindMap>
            <AccountSidebar>
                <Outlet />
            </AccountSidebar>
        </MindMap>
    )
}