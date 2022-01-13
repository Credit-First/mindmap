import * as React from 'react';
import { useRoutes } from "react-router-dom";
import ProgressBar from "./progressbar";
import Layout from "../containers/Layout";
import AccountLayout from "../containers/Layout/account";
import Dashboard from "../containers/Dashboard";
import MindMap from "../containers/MindMap";
import Account from "../containers/Account";
import Settings from "../containers/Account/Settings";
import Login from "../components/auth/Login";
import Register from "../components/auth/Register";

export const routes = [
  { path: '/login', name: 'Login', key: 'login', icon: '', element: <Login /> },
  { path: '/register', element: <Register /> },
  {
    path: '/',
    name: '', key: '', icon: '',
    element: <Layout />,
    children: [
      { path: '/dashboard', name: 'My Map', key: 'mymap', icon: '', element: <Dashboard /> },
      { path: '/recent', name: 'Recent', key: 'recent', icon: '', element: <Dashboard /> },
      { path: '/public', name: 'Public', key: 'public', icon: '', element: <Dashboard /> },
      { path: '/favorites', name: 'Favorites', key: 'favorite', icon: '', element: <Dashboard /> },
      { path: '/trash', name: 'Trash', key: 'trash', icon: '', element: <Dashboard /> },
    ]
  },
  { path: '/mindmap', name: 'MindMap', key: 'mindmap', icon: '', element: <MindMap /> },
  {
    path: '/account', name: 'Account', key: 'account', icon: '',
    element: <AccountLayout />,
    children: [
      { path: '/account/me', name: 'Me', key: 'me', icon: '', element: <Account /> },
      { path: '/account/settings', name: 'Settings', key: 'settings', icon: '', element: <Settings /> },
    ]
  }
]

const Element = () => {
  let list = useRoutes(routes);
  return (
    <ProgressBar>
      {list}
    </ProgressBar>
  );
}

export default Element;
