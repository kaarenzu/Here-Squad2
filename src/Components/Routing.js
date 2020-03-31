import React, { Component } from 'react';
import './Routing.css'

class Routing extends Component {
    constructor(props) {
        super(props)
        this.autosuggestDiv = React.createRef()
        this.inputStarting = React.createRef()
        this.autosuggestEndingDiv = React.createRef()
        this.inputEnding = React.createRef()
        this.state = {
            startingPoint: null,
            endingPoint: null,
            autosuggestion: null,
            autosuggestionEnding: null,
            isLoading: false,
            isLoadingEnding: false,
        }
    }

    // La función que calcula las rutas.
    calculateRoute(point0, point1) {
        console.log('startingPoint', this.state.startingPoint)
        console.log('endingPoint', this.state.endingPoint)
        const H = window.H; // Para que funcione en React hay que ponerle window a todos los "H"
        // Pasas tu Key
        const platform = new H.service.Platform({
            apikey: "cbHG8o5UmCH1wWYcAvvSXlUJeIDjr3CMPE9geRW7Gqw"
        });
        const map = this.props.map

        console.log('point1', point0)
        console.log('point2', point1)
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
        var onResult = function (result) {
            var route,
                routeShape,
                startPoint,
                endPoint,
                linestring;
            if (result.response.route) {
                // Pick the first route from the response:
                route = result.response.route[0];
                // Pick the route's shape:
                routeShape = route.shape;

                // Create a linestring to use as a point source for the route line
                linestring = new H.geo.LineString();

                // Push all the points in the shape into the linestring:
                routeShape.forEach(function (point) {
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
                map.getViewModel().setLookAtData({ bounds: routeLine.getBoundingBox() });
            }
        };

        // Get an instance of the routing service:
        var router = platform.getRoutingService();

        // Call calculateRoute() with the routing parameters,
        // the callback and an error callback function (called if a
        // communication error occurs):
        router.calculateRoute(routingParameters, onResult,
            function (error) {
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
        if (point0 === null || point0 === undefined || point0 ==='') {
            this.setState({
                isLoading: false
            })
        }
        // Fetch de las opciones de autosuggest
        fetch(`https://autosuggest.search.hereapi.com/v1/autosuggest?at=${this.props.center.lat},${this.props.center.lng}&limit=5&q=${point0}+die&apiKey=cbHG8o5UmCH1wWYcAvvSXlUJeIDjr3CMPE9geRW7Gqw`)
            .then(res => res.json())
            .then(data => {
                console.log(data)
                console.log(data.items[0])
                this.setState({
                    autosuggestion: data,
                    isLoading: true,
                })
                console.log('Autosuggesting', this.state.autosuggestion)
            })
            .catch(err =>
                console.error(err),
                this.setState({
                    isLoading: false
                }))

    };

    // Maneja el cambio en el input del punto de llegada
    handleChangeEnding = e => {
        let point1 = e.target.value;
        if (point1 === null || point1 === undefined || point1 ==='') {
            this.setState({
                isLoadingEnding: false
            })
        }
        // Fetch de las opciones de autosuggest
        fetch(`https://autosuggest.search.hereapi.com/v1/autosuggest?at=${this.props.center.lat},${this.props.center.lng}&limit=5&q=${point1}+die&apiKey=cbHG8o5UmCH1wWYcAvvSXlUJeIDjr3CMPE9geRW7Gqw`)
            .then(res => res.json())
            .then(data => {
                console.log(data)
                this.setState({
                    autosuggestionEnding: data,
                    isLoadingEnding: true,
                })
                console.log('isLoadingEnding', this.state.isLoadingEnding)
                console.log('Autosuggesting Ending', this.state.autosuggestionEnding)
            })
            .catch(err =>
                console.error(err),
                this.setState({
                    isLoadingEnding: false
                }))
    }

    // Función que maneja el click que se le da a los suggest del Starting Point
    handleClickAutosuggest = (e, lat, lng) => {
        const choice = e.target.innerText
        console.log(choice)
        this.inputStarting.current.value = choice
        this.setState({
            startingPoint: `${lat},${lng}`,
            autosuggestion: null,
            isLoading: false,
        })
        console.log('Estado del Autosuggest del starting', this.state.startingPoint)
    }

    // Función que maneja el click que se le da a los suggest del Ending Point
    handleClickAutosuggestEnding = (e, lat, lng) => {
        const choice = e.target.innerText
        console.log(choice)
        this.inputEnding.current.value = choice
        this.setState({
            endingPoint: `${lat},${lng}`,
            autosuggestionEnding: null,
            isLoadingEnding: false,
        })
        console.log('Estado del Autosuggest del ending', this.state.endingPoint)
    }

    // Función que maneja el evento cuando le das al Botón de "Buscar Ruta"
    handleClickButton = (e) => {
        let point0 = this.inputStarting.current.value
        let point1 = this.inputEnding.current.value
        if (this.state.startingPoint === null || this.state.endingPoint === null) {
            if (this.state.startingPoint === null && this.state.endingPoint === null) {
                const addressGeocoded = this.geocodingAdresses(point0)
                .then(address =>
                    this.setStartingPoint(address))
                .catch(err =>
                    console.error(err))

                const addressGeocodedEnding = this.geocodingAdresses(point1)
                .then(address =>
                    this.setEndingPoint(address))
                .then(() =>
                    this.calculateRoute(this.state.startingPoint, this.state.endingPoint))
                .catch(err =>
                    console.error(err))

            } else if (this.state.startingPoint === null) {
                // Promesa del Geocoding
                const addressGeocoded = this.geocodingAdresses(point0)
                    .then(address =>
                        this.setStartingPoint(address))
                    .then(() =>
                        this.calculateRoute(this.state.startingPoint, this.state.endingPoint))
                    .catch(err =>
                        console.error(err))
            } else if (this.state.endingPoint === null) {
                    // Promesa del Geocoding
                    const addressGeocoded = this.geocodingAdresses(point1)
                    .then(address =>
                        this.setEndingPoint(address))
                    .then(() =>
                        this.calculateRoute(this.state.startingPoint, this.state.endingPoint))
                    .catch(err =>
                        console.error(err))
            }
        } else {
            this.calculateRoute(this.state.startingPoint, this.state.endingPoint)
        }
    }


    render() {
        return (
            <div className='divRouting'>
                <input
                    key="inputStarting"
                    onChange={e => this.handleChangeStarting(e)}
                    type="text"
                    placeholder="Tu dirección"
                    ref={this.inputStarting} 
                    className='inputRouting inputStarting'/>
                
                    {this.state.isLoading ? 
                    <div className='list listStarting'ref={this.autosuggestDiv}> 
                        {this.state.autosuggestion.items.map(direction => {
                            return <li className="elementAutosuggest" onClick={(e) => this.handleClickAutosuggest(e, direction.position.lat, direction.position.lng)}>{direction.address.label}</li>
                        })} 
                    </div>
                     : null}

                <input
                    key="inputEnding"
                    onChange={e => this.handleChangeEnding(e)}
                    type="text"
                    placeholder="Tu destino"
                    ref={this.inputEnding} 
                    className='inputRouting inputEnding'/>
                
                    {this.state.isLoadingEnding ? 
                    <div className='list' ref={this.autosuggestEndingDiv}>
                    {this.state.autosuggestionEnding.items.map(direction => {
                        return <li className="elementAutosuggest" onClick={(e) => this.handleClickAutosuggestEnding(e, direction.position.lat, direction.position.lng)}>{direction.address.label}</li>
                    })} </div> 
                    : null}

                <img src={require('../img/search.png')} alt="Search button" className="buttonRoute" onClick={e => this.handleClickButton(e)}/>
                {/* <button alt="Search button" className="buttonRoute" onClick={e => this.handleClickButton(e)}>Buscar ruta</button> */}
            </div>
        );
    }
}

export default Routing;