import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Login from '@mui/icons-material/Login';
import { Link } from "react-router-dom";

const pages = ['Products', 'Pricing', 'Blog'];

export default function Navbar() {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
  return (
    <Box style={{ flexGrow: 1 }}>
      <AppBar position="fixed" style={{ background: 'rgb(44, 44, 52)'}}>
        <Toolbar>
          <Typography variant="h6" component="div" style={{ flexGrow: 1 }}>
            MindMap
          </Typography>
          <Box style={{ flexGrow: 0, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                style={{ my: 2, color: 'white', display: 'block' }}
              >
                {page}
              </Button>
            ))}
          </Box>
          <Button variant="outlined" startIcon={<Login />} style={{ background: 'white', borderRadius: 20 }}>
            <Link to='/login' style={{ textDecoration: 'none', color: '#60a0e0'}}>Login</Link>
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
