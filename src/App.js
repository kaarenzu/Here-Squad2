/* eslint-disable no-unused-vars */
import React from 'react';
import './App.css';
import Navbar from './Components/Navbar.jsx';
import { firebase } from './Firebase/ConfigFirebase.jsx'
import LoginView from './Components/LoginView'
import {
  BrowserRouter as Router,
} from "react-router-dom"; 


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { estado: true }
  }

  componentWillMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // Si hay una inicion abierta cambia el estado del componente a falso.
        this.setState({ estado: false })
        console.log('Existe usuario activo');
        const displayName = user.displayName;
        console.log(user.displayName, 'mi nombre')
        const email = user.email;
        console.log(email, 'holaa');
        const emailVerified = user.emailVerified;
        const photoURL = user.photoURL;
        const isAnonymous = user.isAnonymous;
        const uid = user.uid;
        console.log(uid, 'uid');
        const providerData = user.providerData;
      } else {
        // User is signed out.
        this.setState({estado: true})
        console.log('No existe usuario activo');
      }
    });
  }
 
  render() {
    return (
      <Router>
        <div className="divTotal">
          {/* Si el estado del componente es verdadero muestra LoginView si es falso Navbar */}
          {this.state.estado ? <LoginView /> : <Navbar />}
        </div>
      </Router>
    )
  }
}
export default App;
