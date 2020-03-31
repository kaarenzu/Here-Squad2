/* eslint-disable no-this-before-super */
import React from 'react';
import {firebase} from './ConfigFirebase.jsx'

class LoginGoogle extends React.Component{
  constructor(props){
    super(props);
    // Cada vez que se ejecute la funcion login el valor de this dentro del metodo sea el objeto del componente
    this.login= this.login.bind(this); 

  }
  login(){
    let provider = new firebase.auth.GoogleAuthProvider();
    // Retorna una promesa que se resuelve cuando el usuario termina de iniciar sesion con Google
    firebase.auth().signInWithPopup(provider).then(result=>{
      console.log(result)
    })

  }
render(){
  return(
    <div>
      <button type="button" className="btn btn-primary " onClick={this.login}>Crear una cuenta</button>
    </div>
  )
}
} 
export default LoginGoogle;