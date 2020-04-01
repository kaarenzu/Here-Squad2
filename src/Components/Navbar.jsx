import React, { Fragment } from 'react';
import '../Css/navBar.css'
import Map from './Map.js'
import {
  BrowserRouter as Router,
  Route,
  Link
} from "react-router-dom";
import Group from '../Imagenes/Group.png';
import map from '../Imagenes/map.png';
import social from '../Imagenes/social.png'
import CrearPost from './Post.jsx'
import { firebase } from '../Firebase/ConfigFirebase'
import App from '../App.js'

class Navbar extends React.Component {
  constructor() {
    super();
    this.state = {
      estado: true
    }
    this.signOut = this.signOut.bind(this)
  }
  signOut() {
    firebase.auth().signOut()
      .then(() => {
        this.setState({ estado: false })
        console.log('Saliendo...');
      })
      .catch((error) => {
        console.log(error);
      });
  }
  render() {
    if (this.state.estado) {
      return (
        <Router>
          <div className="divFromRouter">
            <nav className="topBar">
              <div className="divIconsTopBar">
                <img src={require('../img/question.png')} alt="Help button" className="buttonsTopBar" />
                <a href="#Modal" role="button" data-toggle="modal">
                  <img src={require('../img/Vector.png')} alt="Options button" className="buttonsTopBar" />
                </a>
                <div id="Modal" class="modal fade">
                  <div class="modal-dialog">
                    <div class="modal-content">
                      <div className="modal-header">
                        <button type="button" className="close" data-dismiss="modal" 
                        aria-hidden="true">&times;</button>
                      </div>
                      <div class="modal-body">
                        <button type="submit" className="btn" id=""
                          onClick={this.signOut} data-dismiss="modal">Cerrar sesión</button>
                      </div>

                    </div>
                  </div>
                </div>
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

            <Route path="/Musica">
            </Route>
          </div>
        </Router>

      )

    }
    return <Fragment>
      {this.state.estado ? null : <App />}
    </Fragment>
  }
}

export default Navbar;