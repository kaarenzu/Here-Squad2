import React, { Fragment } from 'react';
import logo from '../Imagenes/logo.png';
import '../Css/inicioSesion.css'
import {firebase} from '../Firebase/ConfigFirebase.jsx'
// import Navbar from './Navbar.jsx';
// import LoginView from './LoginView.jsx'
import LoginEmail from '../Firebase/LoginEmail.jsx'
import {
  BrowserRouter as Router, 
  Route, Link,
} from "react-router-dom";


class IniciarSesion extends React.Component {
  constructor() {
    super();
    this.state = {
      estado: true,
      email: '',
      password: ''
    }
    this.handlePassword = this.handlePassword.bind(this);
    this.handleEmail = this.handleEmail.bind(this);
    this.signInUser = this.signInUser.bind(this);
    this.backLog = this.backLog.bind(this);
  }
  backLog(){
    this.setState({estado:false})
  }
  // Función que guarda el valor del input Email.
  handleEmail(event) {
    this.setState({ email: event.target.value });
    console.log(this.state.email, 'actualizo email')
  }
  // Función que guarda el valor del input Contraseña.
  handlePassword(event) {
    this.setState({ password: event.target.value });
    console.log(this.state.password, 'actualizo clave')
  }
  // Función que inicia la sesion del usuario
  signInUser = () => {
    firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
      .then(() => {
        this.setState({ estado: false }) // Si el usuario inicia sesion correctamente cambia el estado.
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
        alert(errorMessage);
        // ...
      });
  };
  render() {
    if (this.state.estado) {
      return (
        <Router>
              <div className="containerPer">
          <img
            alt="logo"
            src={logo}
            className="logoSesion" />
          <h5 className="titleLogIn">¡Bienvenido de vuelta!</h5>
          <input type="email" className="inputLogIn" id="inputMailLogIn" placeholder="Correo electronico"
              value={this.state.email} onChange={this.handleEmail} />
          <input type="password" className="inputLogIn" id="inputPassLogIn" placeholder="Contraseña"
              value={this.state.password} onChange={this.handlePassword} />
          <button type="button" className="btnLogIn" id="registrar"
            onClick={this.signInUser}>Iniciar mi sesion</button>
          <Link><p className="backToRegister" onClick={this.backLog}>¿No tienes cuenta? Regístrate</p></Link>
        </div>
        </Router>
    
      )
 }
    return (
      <Fragment>
        {this.state.estado ? null : <LoginEmail/>}
      </Fragment>
    )
  }
}
export default IniciarSesion;