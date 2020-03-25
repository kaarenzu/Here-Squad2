import React, { Component } from 'react';

class Routing extends Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }

    // Función que cambia las direcciones normales a lat y lng para que puedan ser usadas en el Routing
    geocodingAdresses = (direction) => {
        return new Promise((resolve, reject) => {
            const H = window.H; // Para que funcione en React hay que ponerle window a todos los "H"
            // Pasas tu Key
            const platform = new H.service.Platform({
                apikey: "cbHG8o5UmCH1wWYcAvvSXlUJeIDjr3CMPE9geRW7Gqw"
            });
            // Create the parameters for the geocoding request:
            var geocodingParams = {
                searchText: direction
            };

            // Define a callback function to process the geocoding response:
            var onResult = (result) => {
                var locations = result.Response.View[0].Result;
                console.log('Estas son las locations:', locations)
                var position = `${locations[0].Location.DisplayPosition.Latitude},${locations[0].Location.DisplayPosition.Longitude}`
                console.log('Esta es la Position:', position)
                return resolve(position)
            }

            // Get an instance of the geocoding service:
            var geocoder = platform.getGeocodingService();

            // Call the geocode method with the geocoding parameters,
            // the callback and an error callback function (called if a
            // communication error occurs):
            geocoder.geocode(geocodingParams, onResult, function (e) {
                alert(e);
            });
        })
    }

    // Maneja el cambio en el input del punto de partida
    handleChangeStarting = e => {
        let point0 = e.target.value;
        // Promesa del Geocoding
        const addressGeocoded = this.geocodingAdresses(point0)
        .then( address => 
            this.props.setStartingPoint(address)) 
        console.log(point0)
    };

    // Maneja el cambio en el input del punto de llegada
    handleChangeEnding = e => {
        const point1 = e.target.value;
        // Promesa del Geocoding
        const addressGeocoded = this.geocodingAdresses(point1)
        .then( address => 
            this.props.setEndingPoint(address)) 
    }


    render() {
        return (
            <div>
                <input
                    key="inputStarting"
                    onChange={e => this.handleChangeStarting(e)}
                    type="text"
                    placeholder="¿Dónde estás?" />

                <input
                    key="inputEnding"
                    onChange={e => this.handleChangeEnding(e)}
                    type="text"
                    placeholder="¿A dónde quieres ir?" />
                <button onClick={e => this.props.calculateRoute()}>Buscar ruta</button>
            </div>
        );
    }
}

export default Routing;