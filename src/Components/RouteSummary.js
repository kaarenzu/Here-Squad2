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
                        <a href="#ModalBookmark" role="button" data-toggle="modal">
                            <img src={require('../img/Bookmark.png')} alt="Save Route button" className="buttonSave" onClick={e => this.saveRoute() }/>
                        </a>    
                            <div id="ModalBookmark" className="modal fade">
                                <div className="modal-dialog">
                                    <div className="modal-content">
                                    <div className="modal-header">
                                        <button type="button" className="close" data-dismiss="modal" 
                                        aria-hidden="true">&times;</button>
                                    </div>
                                    <div className="modal-body">
                                        <button type="submit" className="btn" id=""
                                        data-dismiss="modal">¡Viaje guardado! Encuéntralo en la sección de configuración</button>
                                    </div>
                                    </div>
                                </div>
                                </div>
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