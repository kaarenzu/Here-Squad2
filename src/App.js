/* eslint-disable no-unused-vars */
import React from 'react';
import './App.css';
import Map from './Components/Map'
// import 'bootstrap/dist/css/bootstrap.min.css';
// import Navbar from './Components/Navbar.jsx';
import LoginView from './Components/LoginView'
import {
  BrowserRouter as Router,
  Route,
  Link
} from "react-router-dom"; // Importamos los componentes de la libreria con los que haremos el router

class App extends React.Component {
  render() {
    return (
      <Router>
        <div className="divTotal">
          {/* <Map /> */}
          {/* <Navbar /> */}
          <LoginView/>
        </div>
      </Router>
    )
  }
}

export default App;
