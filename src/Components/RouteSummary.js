import React, { Component } from 'react';
import './RouteSummary.css'

class RouteSummary extends Component {


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
                            <img src={require('../img/Bookmark.png')} alt="Save Route button" className="buttonSave" />
                        </div>
                        {this.props.instructions.map(maneuver => {
                            return (
                                <li className="liInstructions" dangerouslySetInnerHTML={this.makeHTML(maneuver.instruction)}></li>)
                        })}
                    </div>
                }
            </div>

        );
    }


}

export default RouteSummary;