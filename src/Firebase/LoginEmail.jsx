import React, {Fragment} from 'react';
import logo from '../Imagenes/logo.png';
import '../Css/loginEmail.css';
import firebase from './ConfigFirebase.jsx'
import IniciarSesion from '../Components/InicioSesion';


class LoginEmail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      estado: true,
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
      // .then(result => result.user.updateProfile({
      //   displayName: this.state.name,
      // }))
      .then(() => {
        this.setState({ estado:false });

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
    if(this.state.estado){
      return (
        <div className="containerSignUp">
          <img
            alt="logo"
            src={logo}
            className="logoEmail" />
            <h5 className="titleSignUp">Crea una cuenta para acceder a <span className="moveCalmText">Move Calm</span></h5>
            <input type="text" className="inputSignUp" id="inputUserSignUp" placeholder="Nombre de usuario"
              value={this.state.name} onChange={this.handleName} />
            <input type="email" className="inputSignUp" id="inputMailSignUp" placeholder="Correo electronico"
              value={this.state.email} onChange={this.handleEmail} />
            <input type="password" className="inputSignUp" id="inputPassSignUp" placeholder="Contraseña"
              value={this.state.password} onChange={this.handlePassword} />
            <button type="submit" className="btnSignUp" id="registrar" 
              onClick={this.singUpNewUser}>Registrarme</button>
            <p className="backToLogIn">¿Ya tienes cuenta? Inicia sesión</p>
        </div>
      )
    }
    return (
      <Fragment>
        {this.state.estado?null:<IniciarSesion/>}
      </Fragment>
    )
  }
}

export default LoginEmail;