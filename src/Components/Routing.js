import React, { Component } from 'react';

class Routing extends Component {
    constructor(props) {
        super(props)
        this.state = {
            startingPoint: null,
            endingPoint: null,
        }
    }

    // La función que calcula las rutas.
    calculateRoute(point0, point1) {
        console.log('startingPoint',this.state.startingPoint)
        console.log('endingPoint',this.state.endingPoint)
        const H = window.H; // Para que funcione en React hay que ponerle window a todos los "H"
        // Pasas tu Key
        const platform = new H.service.Platform({
            apikey: "cbHG8o5UmCH1wWYcAvvSXlUJeIDjr3CMPE9geRW7Gqw"
        });
        const map = this.props.map

        console.log('point1',point0)
        console.log('point2',point1)
                // Routing
                var routingParameters = {
                    // The routing mode:
                    'mode': 'fastest;publicTransport',
                    // The start point of the route:
                    'waypoint0': point0,
                    // The end point of the route:
                    'waypoint1': point1,
                    // To retrieve the shape of the route we choose the route
                    // representation mode 'display'
                    'representation': 'display'
                  };
                  
                  // Define a callback function to process the routing response:
                  var onResult = function(result) {
                    var route,
                      routeShape,
                      startPoint,
                      endPoint,
                      linestring;
                    if(result.response.route) {
                    // Pick the first route from the response:
                    route = result.response.route[0];
                    // Pick the route's shape:
                    routeShape = route.shape;
                  
                    // Create a linestring to use as a point source for the route line
                    linestring = new H.geo.LineString();
                  
                    // Push all the points in the shape into the linestring:
                    routeShape.forEach(function(point) {
                      var parts = point.split(',');
                      linestring.pushLatLngAlt(parts[0], parts[1]);
                    });
                  
                    // Retrieve the mapped positions of the requested waypoints:
                    startPoint = route.waypoint[0].mappedPosition;
                    endPoint = route.waypoint[1].mappedPosition;
                  
                    // Create a polyline to display the route:
                    var routeLine = new H.map.Polyline(linestring, {
                      style: { strokeColor: 'blue', lineWidth: 3 }
                    });
                  
                    // Create a marker for the start point:
                    var startMarker = new H.map.Marker({
                      lat: startPoint.latitude,
                      lng: startPoint.longitude
                    });
                  
                    // Create a marker for the end point:
                    var endMarker = new H.map.Marker({
                      lat: endPoint.latitude,
                      lng: endPoint.longitude
                    });
                  
                    // Add the route polyline and the two markers to the map:
                    map.addObjects([routeLine, startMarker, endMarker]);
                  
                    // Set the map's viewport to make the whole route visible:
                    map.getViewModel().setLookAtData({bounds: routeLine.getBoundingBox()});
                    }
                  };
                  
                  // Get an instance of the routing service:
                  var router = platform.getRoutingService();
                  
                  // Call calculateRoute() with the routing parameters,
                  // the callback and an error callback function (called if a
                  // communication error occurs):
                  router.calculateRoute(routingParameters, onResult,
                    function(error) {
                      alert(error.message);
                    });
    }

    // Guarda el punto de inicio en el estado
    setStartingPoint(point0) {
        this.setState({
            startingPoint: point0
        })
    }

    // Guarda el punto final en el estado
    setEndingPoint(point1) {
        this.setState({
            endingPoint: point1
        })
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
            this.setStartingPoint(address))
        .catch (err => 
            console.error(err))
    };

    // Maneja el cambio en el input del punto de llegada
    handleChangeEnding = e => {
        const point1 = e.target.value;
        // Promesa del Geocoding
        const addressGeocoded = this.geocodingAdresses(point1)
        .then( address => 
            this.setEndingPoint(address)) 
        .catch (err => 
            console.error(err))
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
                <button onClick={e => this.calculateRoute(this.state.startingPoint,this.state.endingPoint)}>Buscar ruta</button>
            </div>
        );
    }
}

export default Routing;