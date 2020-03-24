import React, { Component } from 'react';

class Routing extends Component {
    constructor(props) {
        super(props)
        this.state = {
            point0: null
        }
    }

    geocodingAdresses = (direction) => {
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
            console.log('Estas son las locations:',locations)
            var position = `${locations[0].Location.DisplayPosition.Latitude},${locations[0].Location.DisplayPosition.Longitude}`
            console.log('Esta es la Position:', position)
            this.setState({
                point0: position
            })
        }

        // Get an instance of the geocoding service:
        var geocoder = platform.getGeocodingService();

        // Call the geocode method with the geocoding parameters,
        // the callback and an error callback function (called if a
        // communication error occurs):
        geocoder.geocode(geocodingParams, onResult, function (e) {
            alert(e);
        });
    }

    handleChangeStarting = e => {
        let point0 = e.target.value;
        this.geocodingAdresses(point0)
        point0 = this.state.point0
        console.log(point0)
        this.props.setStartingPoint(point0);
    };

    handleChangeEnding = e => {
        const point1 = e.target.value;
        console.log('En el handle', point1)
        this.props.setEndingPoint(point1);
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