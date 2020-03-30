/* eslint-disable no-unused-vars */
import React from 'react';
// import logo from './logo.svg';
import './App.css';
// import Map from './Components/Map'
// import LoginView from './Components/LoginView.jsx';
// import Button from './Components/Button.jsx'
// import LoginEmail from './Firebase/LoginEmail.jsx'
import Navbar from './Components/Navbar.jsx';
import {
  BrowserRouter as Router,
  Route,
  Link
} from "react-router-dom"; // Importamos los componentes de la libreria con los que haremos el router

class App extends React.Component {
  render() {
    return (
      <Router>
         <div>
        {/* <Map /> */}
      <Navbar/>
      
      </div>

      </Router>
     
      
    )
  }
}

export default App;
