import React from 'react';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';

function Footer() {
  return (
    <Paper elevation={3} style={{ marginTop: '20px', padding: '10px',backgroundColor:"lightgray" }}>
      <Typography variant="body2" color="text.secondary" align="center">
        © {new Date().getFullYear()} YoshiSpace | Developed by Yoshitha
      </Typography>
    </Paper>
  );
}

export default Footer;
