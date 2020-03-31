import React from 'react';
import '../Css/navBar.css'
import LoginView from './LoginView'
import Map from './Map.js'
import {
  BrowserRouter as Router,
  Route,
  Link
} from "react-router-dom";
// import logo from '../Imagenes/logo.png';
import Group from '../Imagenes/Group.png';
import map from '../Imagenes/map.png';
import social from '../Imagenes/social.png'


class Navbar extends React.Component {
  render() {
    return (
      <Router>
        <div>
          <div className="container">
            <nav className="navbar navbar-default navbar-fixed-bottom" id="navbar" role="navigation">
              <ul>
                <Link to="/" className="text-white ">
                  <img alt="logo" src={map} className="lo" />
                </Link>
                <Link to="/Musica" className="text-white ">
                  <img alt="logo" src={Group} className="lo" />
                </Link>
                <Link to="/Login" className="text-white "><img alt="logo" src={social} className="lo" /></Link>
                {/* <Link to="/Login" className="text-white "><li>Perfil</li></Link> */}
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