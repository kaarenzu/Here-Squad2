/* eslint-disable jsx-a11y/alt-text */
import React from 'react'
import LoginGoogle from '../Firebase/LoginGoogle';
import '../Css/login.css'
// Importamos los componentes de la libreria con los que haremos el router
import {
  BrowserRouter as Router,
  // eslint-disable-next-line no-unused-vars
  Route,
  // eslint-disable-next-line no-unused-vars
  Link
} from "react-router-dom"; 

class LoginView extends React.Component {
  render(){
    return(
      <Router>
        <div className="containe">
          <img src="https://github.com/kaarenzu/Here-Squad2/blob/master/src/Imagenes/logo.png?raw=true" className="logo"/>
          <h5>Planifica tus viajes, siéntente seguro Move Calm te acompaña </h5>
          
          <div className ="botones">
          <LoginGoogle/>
         
          <button type="button" className="btn btn-outline-info lg" id ="iniciarSesion">Iniciar sesión</button>
          </div>



        </div>
      </Router>
    )
  }
}
export default LoginView;