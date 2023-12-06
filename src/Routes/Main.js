import React from 'react'
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Login from '../Pages/Login';
import Signup from '../Pages/Signup';
import Home from '../Pages/Home';

function Main() {
   const is_loggedIn = localStorage.getItem('is_loggedIn')
    return (
        <Router>
        <Routes>
          <Route path="/" element={is_loggedIn == true ? <Home /> :<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/home" element={ <Home />} />
        </Routes>
      </Router>
    )
}

export default Main