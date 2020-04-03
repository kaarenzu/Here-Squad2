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
import App from '../App.js';
import VideosYoutube from './Musica.jsx'
import SavedRoutes from './SavedRoutes'

class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.modal = React.createRef()
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

  handleClickSaved = (e) => {
    // e.target.style.display = 'none'
    this.modal.current.style.display = 'none'
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
                <div ref={this.modal} id="Modal" className="modal fade">
                  <div className="modal-dialog">
                    <div className="modal-content">
                      <div className="modal-header">
                        <button type="button" className="close" data-dismiss="modal" 
                        aria-hidden="true">&times;</button>
                      </div>
                      <div className="modal-body">
                        <Link to="/SavedRoutes">
                        <button type="submit" className="btn btnSaved" id=""
                             onClick={e => this.handleClickSaved(e)}>Mis rutas guardadas</button>
                        </Link>
                        <button type="submit" className="btn" id=""
                          onClick={this.signOut} data-dismiss="modal">Cerrar sesión</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </nav>
            <nav className="containerNavBar">
              <Link to="/">
                <img alt="logo" src={map} className="iconBottomBar" />
              </Link>
              <Link to="/Musica">
                <img alt="logo" src={Group} className="iconBottomBar" />
              </Link>
              <Link to="/Comunidad">
                <img alt="logo" src={social} className="iconBottomBar" />
              </Link>
            </nav>

            <Route exact path="/">
              <Map />
            </Route>

            <Route path="/Comunidad">
              <CrearPost />
            </Route>

            <Route path="/Musica">
              <VideosYoutube/>
            </Route>

            <Route path="/SavedRoutes">
              <SavedRoutes />
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