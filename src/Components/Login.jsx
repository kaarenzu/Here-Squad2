/* eslint-disable jsx-a11y/alt-text */
import React from 'react'
import LoginGoogle from '../Firebase/Authentication';
import '../Css/login.css'
// Importamos los componentes de la libreria con los que haremos el router
import {
  BrowserRouter as Router,
  Route,
  Link
} from "react-router-dom"; 

class LoginView extends React.Component {
  render(){
    return(
      <Router>
        <div className="container">
          <img src="../Imagenes/logo.png"/>
          <h4>Planifica tus viajes, siéntente seguro Move Calm te acompaña</h4>
          <div className ="botones">
          <LoginGoogle/>


          </div>


        </div>
      </Router>
    )
  }
}
export default LoginView;