import React, { Component } from 'react';

class Routing extends Component {

    handleChangeStarting = e => {
        const point0 = e.target.value;
        this.props.setStartingPoint(point0);
      };

    handleChangeEnding = e => {
        const point1 = e.target.value;
        console.log('En el handle',point1)
        this.props.setEndingPoint(point1);
    }


    render() {
        return (
            <div>
                <input 
                key="inputStarting"
                onChange= {e => this.handleChangeStarting(e)}
                type="text" 
                placeholder="¿Dónde estás?"/>
                <input 
                key="inputEnding"
                onChange= {e => this.handleChangeEnding(e)}
                type="text" 
                placeholder="¿A dónde quieres ir?"/>
                <button onClick={e => this.props.calculateRoute()}>Buscar ruta</button>
            </div>
        );
    }
}

export default Routing;