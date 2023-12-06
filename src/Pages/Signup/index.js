import React, { useState } from 'react';
import {
  Container,
  Typography,
  TextField,
  Button,
  Paper,
  Grid,
  AppBar,
  Toolbar,
} from '@mui/material';
import { Link } from 'react-router-dom';
import "react-toastify/dist/ReactToastify.css";
import { error, normal, success } from '../../Components/toast';
import usePostRequest from '../../Hooks/Post';
import { baseurl, endpoints } from '../../Api';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [payload,setPayload] = useState({});
  const { response, warning , loading , trigger } = usePostRequest();
  

  const handleSignup = async() => {
    if(password.length < 6){
        error('Password should have a minimum 6 characters');
        return;
    }
    if(password != confirmPassword){
        error('Both passwords are not same');
        return;
    }
    setPayload({
        username,
        password,
        email
    })
    if(loading == false){
        let result = await trigger(endpoints.signup,{
          username,
          password,
          email
      });
        if(result.message == 'Account created successfully'){
            success('Account created successfully');
        }
    }
    
  };

  return (
    <Container component="main" maxWidth="xs" style={{ marginTop: '2rem' }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">Signup Form</Typography>
        </Toolbar>
      </AppBar>
      <Grid container justifyContent="center">
        <Grid item component={Paper} elevation={6} square style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '2rem' }}>
          <Typography component="h1" variant="h5" gutterBottom>
            Signup
          </Typography>
          <form style={{ width: '100%' }}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoFocus
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="confirmPassword"
              label="Confirm Password"
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <Button
              fullWidth
              variant="contained"
              color="primary"
              style={{ marginTop: '1rem' }}
              onClick={handleSignup}
            >
              Signup
            </Button>
          </form>
          <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: '1rem' }}>
            <p>Already have an account?</p>
            <Link to='/' style={{ marginLeft: 10, color: 'blue', cursor: 'pointer', textDecoration: 'none'}}>Login</Link>
          </div>
        </Grid>
      </Grid>
      <footer style={{ marginTop: '2rem', textAlign: 'center' }}>
        <Typography variant="body2" color="textSecondary">
          © {new Date().getFullYear()} YoshiSpace
        </Typography>
      </footer>
    </Container>
  );
};

export default Signup;
