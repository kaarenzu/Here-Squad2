import React from 'react';
import logo from '../Imagenes/logo.png';
import '../Css/loginEmail.css';
import firebase from './ConfigFirebase.jsx'


class LoginEmail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      password: ''
    }

    this.handleName = this.handleName.bind(this);
    this.handleEmail = this.handleEmail.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
    this.singUpNewUser = this.singUpNewUser.bind(this);
  }
  handleName(event) {
    this.setState({ name: event.target.value });
    console.log(this.state.name, 'muestro mi nombre')
  }
  handleEmail(event) {
    this.setState({ email: event.target.value });
    console.log(this.state.email, 'actualizo email')
  }
  handlePassword(event) {
    this.setState({ password: event.target.value });
    console.log(this.state.password, 'actualizo clave')
  }
  singUpNewUser = (email, password, name) => {

    firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then(result => result.user.updateProfile({
        displayName: name,
      }))
      .then(() => {

      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        if (errorCode === 'auth/weak-password') {
          alert('error?.');
        } else {
          alert(errorMessage);
        }
        console.log(errorCode);
        console.log(errorMessage);
       
      });
  };
  render() {
    return (
      <div className="containerPer">
        <img
          alt="logo"
          src={logo}
          className="logoEmail" />
          <h5 className="h5">Crea una cuenta para acceder a Move Calm</h5>
        <div className="contInput">
          <input type="text" className="input" placeholder="Nombre de usuario"
            value={this.state.name} onChange={this.handleName} />
          <input type="text" className="input" placeholder="Correo electronico"
            value={this.state.email} onChange={this.handleEmail} />
          <input type="text" className="input" placeholder="Contraseña"
            value={this.state.password} onChange={this.handlePassword} />
        </div>
          <button type="submit" className="btn btn-outline-info lg" id="registrar" 
            onClick={this.singUpNewUser}>Registrarme
          </button>
      </div>
    )
  }
}

export default LoginEmail;