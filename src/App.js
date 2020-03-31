/* eslint-disable no-unused-vars */
import React from 'react';
import './App.css';
import Map from './Components/Map'
// import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './Components/Navbar.jsx';
import {firebase} from './Firebase/ConfigFirebase.jsx'
import LoginView from './Components/LoginView'
import {
  BrowserRouter as Router,
  Route,
  Link
} from "react-router-dom"; // Importamos los componentes de la libreria con los que haremos el router

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { estado: true }
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ estado: false })
        console.log('Existe usuario activo');
        // User is signed in.
        const displayName = user.displayName;
        //  console.log(user);
        const email = user.email;
        const emailVerified = user.emailVerified;
        const photoURL = user.photoURL;
        const isAnonymous = user.isAnonymous;
        const uid = user.uid;
        const providerData = user.providerData;
        // ...
      } else {

        // User is signed out.
        console.log('No existe usuario activo');
        // ...
      }
    });
  }
  render() {
    return (
      <Router>
        <div className="divTotal">
          {this.state.estado ? <LoginView /> : <Navbar />}
          {/* <Map /> */}
          {/* <Navbar /> */}
        </div>
      </Router>
    )
  }
}

export default App;
