import React, { Component } from 'react';
import './RouteSummary.css'
import { db, firebase } from '../Firebase/ConfigFirebase';

class RouteSummary extends Component {

    constructor(props) {
        super(props)
        this.state = {

        }
    }

    saveRoute = () => {
        const user = firebase.auth().currentUser;
        db.collection('routes').add({
          route: this.props.maneuvers,
          datatime: new Date(),
          name: user.displayName,
          userID: user.uid,
          mode: this.props.modeSummary,
          startPoint: this.props.startingSummary,
          endPoint: this.props.endingSummary,
        })
        .then (() => {
            alert('Ruta guardada, entra en la sección de configuración para ver tus rutas guardadas')
        })
        //   .then((postNew) => {
        //     const collecionPost = db.collection('post');
        //     const collecionPostOrdenada = collecionPost.orderBy('datatime', 'desc');
        //     collecionPostOrdenada.get().then((element) => {
        //       const postNew = element.docs.map(doc => doc.data());
        //       console.log(postNew, 'postNew')
        //       this.setState({
        //         mensaje: [],
        //         mostrarPost: postNew,
        //         name: user.displayName
        //       })
        //       this.textAreaPost.current.value = ""
        //     })
        //   })
        //   .catch((error) => {
        //     console.error('Error adding document: ', error);
        //   });
      }


    // Función que inyecta el HTML en el Div (aunque es un práctica peligrosa y 
    // que no se debería hacer) porque viene con tags HTML del JSON
    makeHTML = (newHtml) => {
        return { __html: newHtml };
    }

    render() {
        return (
            <div>

                {this.props.isLoadingInstructions &&
                    <div className="divInstructions"> 
                        <div className="divTopSummary" >
                            <img src={require('../img/Bookmark.png')} alt="Save Route button" className="buttonSave" onClick={e => this.saveRoute() }/>
                        </div>
                        {this.props.maneuvers.map(maneuver => {
                            return (
                                <li className="liInstructions" dangerouslySetInnerHTML={this.makeHTML(maneuver)}></li>)
                        })}
                    </div>
                }
            </div>

        );
    }


}

export default RouteSummary;