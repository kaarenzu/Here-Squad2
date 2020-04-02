import React, { Component } from 'react';
import { db, firebase } from '../Firebase/ConfigFirebase';
import '../Css/savedRoutes.css'

class SavedRoutes extends Component {

    constructor(props) {
        super(props)
        this.state = {
            showRoutes: []
        }
    }


    componentDidMount() {
        const user = firebase.auth().currentUser;
        const collecionRoutes = db.collection('routes');
        const collectionFilter = collecionRoutes.where("userID", "==", user.uid)
        const collectionFilterOrder = collectionFilter.orderBy('datatime', 'desc');
        
        collectionFilterOrder.get().then((route) => {
          const routeNew = route.docs.map(doc => doc.data());
    
          console.log(routeNew, 'Rutas en el estado')
          this.setState({
            showRoutes: routeNew,
          })
    
        })
    
      }

    // Función que inyecta el HTML en el Div (aunque es un práctica peligrosa y 
    // que no se debería hacer) porque viene con tags HTML del JSON
    makeHTML = (newHtml) => {
        return { __html: newHtml };
    }
    render() {
        return (
            <div className="containerSavedRoutes">
                <header className="headerCommunity">
                    <h1 className="headerText textCom">Mis viajes guardados</h1>
                </header>
                <section className="tripsSections">
                {this.state.showRoutes.map((trip, key) => {
                return (
                  <div className="cardRoute" key={key}>
                    <p className="waypointsSaved">Desde: <span class="tripPoint">{trip.startPoint}</span></p> 
                    <p className="waypointsSaved">Hasta: <span class="tripPoint">{trip.endPoint}</span></p>
                    <p className="waypointsSaved">Medio de transporte: 
                    {trip.mode === "publicTransport" && <span class="tripPoint"> Transporte público</span>}
                    {trip.mode === "car" && <span class="tripPoint"> Auto</span>}
                    {trip.mode === "pedestrian" && <span class="tripPoint"> Caminando</span>}
                    </p> 
                    <p className="waypointsSaved">Instrucciones:</p>
                    <div className="divInstructionsSaved">
                        {trip.route.map(maneuver => {
                            return (
                                <li className="liInstructions" dangerouslySetInnerHTML={this.makeHTML(maneuver)}></li>)
                        })} 
                    </div>
                  </div>
                )
                })
                }
                </section> 
            </div>
        );
    }
}

export default SavedRoutes;