import React, { useEffect, useState } from 'react';
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
import usePostRequest from '../../Hooks/Post';
import { error , success} from '../../Components/toast';
import { endpoints } from '../../Api';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [payload,setPayload] = useState({});
  const { response, warning , loading , trigger } = usePostRequest();
  const navigate = useNavigate();

  const handleLogin = async() => {
    if(password.length < 6){
      error('Password should have a minimum 6 characters');
      return;
  }
  setPayload({
      username,
      password,
  })
  if(loading == false){
      let result = await  trigger(endpoints.signin,{
        email : username,
        password,
    });
      if(result?.message == "login sucess"){
          success('login successfully');
          localStorage.setItem('user_data', JSON.stringify(result?.data?.user));
          localStorage.setItem('token',result?.data?.token)
          localStorage.setItem('is_loggedIn', true);
          navigate('/home',{replace:true})
      }
    }
  };

  return (
    <Container component="main" maxWidth="xs" style={{ marginTop: '2rem' }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">Login Form</Typography>
        </Toolbar>
      </AppBar>
      <Grid container justifyContent="center">
        <Grid item component={Paper} elevation={6} square style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '2rem' }}>
          <Typography component="h1" variant="h5" gutterBottom>
            Login
          </Typography>
          <form onSubmit={(e) => e.preventDefault()} style={{ width: '100%' }}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              type='email'
              name="email"
              autoFocus
              value={username}
              onChange={(e) => setUsername(e.target.value)}
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
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              style={{ marginTop: '1rem' }}
              onClick={handleLogin}
            >
              Login
            </Button>
          </form>
           <div style={{display : 'flex',flexDirection : 'row',justifyContent : 'center',alignItems : 'center'}}>
              <p>New User?</p>
              <Link to='/signup' style={{marginLeft : 10,color : 'blue',cursor : 'pointer',textDecoration: 'none'}}>Create Account</Link>
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

export default Login;
