import React from 'react';
import '../Css/navBar.css'
import LoginView from './LoginView'
import Map from './Map.js'
import {
  BrowserRouter as Router,
  Route,
  Link
} from "react-router-dom";

class Navbar extends React.Component {
  render() {
    return (
      <Router>
        <div>
          <div className="container">
            <nav className="navbar navbar-default navbar-fixed-bottom" id="navbar" role="navigation">
              <ul>
                <Link to="/" className="text-white "><li>Mapa</li></Link>
                <Link to="/Comunidad" className="text-white "><li>Comunidad</li></Link>
                <Link to="/" className="text-white "><li>Música</li></Link>
                <Link to="/Login" className="text-white "><li>Perfil</li></Link>
              </ul>
            </nav>
          </div>
          <Route exact path="/">
            <Map />
          </Route>
          <Route path="/Login">
            <LoginView />
          </Route>
        </div>
      </Router>

    )
  }
}

export default Navbar;