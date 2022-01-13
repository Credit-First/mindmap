import { Outlet } from 'react-router-dom';
import * as React from 'react';
import { Box } from '@material-ui/core';

export default function Settings() {
    return (
        <Box
            component="main"
            style={{ p: 3, mt: 10 }}
            noValidate
            autoComplete="off"
        >
            Settings
        </Box>
    )
}