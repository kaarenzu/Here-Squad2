import React from 'react';
import '../Css/navBar.css'
// import LoginView from './LoginView'
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
import CrearPost from './Post.jsx'


class Navbar extends React.Component {
  render() {
    return (
      <Router>
        <div className="divFromRouter">
          <nav className="topBar">
            <div className="divIconsTopBar">
              <img src={require('../img/question.png')} alt="Help button" className="buttonsTopBar"/>
              <img src={require('../img/Vector.png')} alt="Options button" className="buttonsTopBar"/>
            </div>
          </nav>
          <nav className="containerNavBar">
                <Link to="/" className="text-white ">
                  <img alt="logo" src={map} className="iconBottomBar" />
                </Link>
                <Link to="/Musica" className="text-white ">
                  <img alt="logo" src={Group} className="iconBottomBar" />
                </Link>
                <Link to="/Comunidad" className="text-white "><img alt="logo" src={social} className="iconBottomBar" /></Link>
                {/* <Link to="/Login" className="text-white "><li>Perfil</li></Link> */}
            </nav>

          <Route exact path="/">
            <Map />
          </Route>
          <Route path="/Comunidad">
            <CrearPost />

          </Route>
        </div>
      </Router>

    )
  }
}

export default Navbar;