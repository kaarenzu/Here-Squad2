/* eslint-disable jsx-a11y/alt-text */
import React, { Fragment } from 'react'
import '../Css/login.css'
import LoginEmail from '../Firebase/LoginEmail.jsx'
import InicioSesion from './InicioSesion.jsx';

class LoginView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isActive: false,
      isNavbar: true
    }
    this.handleToggleClick = this.handleToggleClick.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }
  // Función que cambia el estado del componente a falso
  handleToggleClick() {
    this.setState(({ isActive: true }));
    console.log(this.state.isActive, 'mi estado')
  }
  handleClick() {
    this.setState({ isNavbar: false })
    console.log(this.state.isNavbar, 'mi estado navbar')
  }
  render() {
    // Si el estado es true me muestra Login
    if (!this.state.isActive === this.state.isNavbar) {
      return (
        <Fragment>
          <div className="containerWelcome">
            <img
              src={require("../Imagenes/logo.png")}
              className="logo" />
            <div className="divTextWelcome">
              <h5 className="titleWelcome">Planifica tus viajes, siéntete seguro</h5>
              <h5 className="titleWelcome"><span className="spanWelcome">Move Calm</span> te acompaña </h5>
            </div>
            {/* Con este boton cambio el estado a falso */}
            <button type="button" onClick={this.handleToggleClick}
              className="btnWelcome"
              id="crearCuenta">{this.state.isActive ? 'Crear una cuenta' : 'Crear cuenta'}
            </button>
            <button type="button" className="btnWelcome"
              onClick={this.handleClick} id="iniciarSesion">{this.state.isNavbar ? 'Iniciar Sesión' : 'false'}
            </button>
          </div>
        </Fragment>
      )
    }
    return(
      <Fragment>
        {this.state.isActive ? <LoginEmail /> : <InicioSesion />}
      </Fragment>
    )
  }
}
export default LoginView;