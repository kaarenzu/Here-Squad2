import React from 'react';
import logo from '../Imagenes/logo.png';
import '../Css/inicioSesion.css'


class IniciarSesion extends React.Component {
  render(){
    return(
      <div className="containerPer">
      <img 
    alt="logo" 
    src={logo}
    className="logo" />
    <h5 className="h5">Bienvenido otra vez</h5>
    <div className="contInput">
    <input type="text" className="input" placeholder="Correo electronico"/>
    <input type="text" className="input" placeholder="Contraseña"/>
    </div>
    <button type="button" className="btn btn-outline-info lg" id ="registrar">Iniciar mi sesion</button>
   
  </div>
    )
  }
}
export default IniciarSesion;