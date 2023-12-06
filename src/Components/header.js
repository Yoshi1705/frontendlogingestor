import React, { useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

function Header({navigate}) {

     const user = JSON.parse(localStorage.getItem('user_data'))
  return (
    <AppBar position="static">
    <Toolbar>
      <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
        QueryInterface
      </Typography>
      <Typography variant="subtitle1">{user?.username}</Typography>
      <IconButton size="large" edge="end" color="inherit" aria-label="user">
        <AccountCircleIcon />
      </IconButton>
      <IconButton size="large" edge="end" color="inherit" aria-label="logout" onClick={()=>{
        localStorage.setItem('user_data', null);
        localStorage.setItem('token',null)
        localStorage.setItem('is_loggedIn', false);
        navigate('/',{replace:true})
      }}>
        <ExitToAppIcon />
      </IconButton> 
    </Toolbar>
  </AppBar>
  );
}

export default Header;
