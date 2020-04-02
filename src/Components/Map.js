// src/DisplayMapClass.js
import * as React from 'react';
import Routing from './Routing'
import './Map.css'
import RouteSummary from './RouteSummary'
import APoint from '../img/a.png'
import BPoint from '../img/b.png'

class Map extends React.Component {
    mapRef = React.createRef();
    constructor(props) {
        super(props)
        this.state = {
            map: null,
            center: {
                lat: -33.444379,
                lng: -70.650400,
            }, 
            instructions: [],
            isLoadingInstructions: false,
            startingSummary: null,
            endingSummary: null, 
            modeSummary: null,
            maneuvers: [],
        };
    }

    // La función que calcula las rutas.
    calculateRoute = (point0, point1, mode) => {
        const H = window.H; // Para que funcione en React hay que ponerle window a todos los "H"
        // Pasas tu Key
        const platform = new H.service.Platform({
            apikey: "cbHG8o5UmCH1wWYcAvvSXlUJeIDjr3CMPE9geRW7Gqw"
        });
        const map = this.state.map

        console.log('point1', point0)
        console.log('point2', point1)
        // Routing
        var routingParameters = {
            // The routing mode:
            'mode': `fastest;${mode}`,
            // The start point of the route:
            'waypoint0': point0,
            // The end point of the route:
            'waypoint1': point1,
            // To retrieve the shape of the route we choose the route
            // representation mode 'display'
            'representation': 'display', 
            // Lenguaje en que va a dar la ruta. 
            'language' : 'es'
        };

        // Define a callback function to process the routing response:
        var onResult = (result) => {
            var route,
                routeShape,
                startPoint,
                endPoint,
                linestring;
            map.removeObjects(map.getObjects([routeLine, startMarker, endMarker]))
            if (result.response.route) {
                // Pick the first route from the response:
                route = result.response.route[0];
                console.log('>>>>Esta es la ruta', route)
                console.log('>>>Estas son las maniobras', route.leg[0].maneuver)
                route.leg[0].maneuver.map(maneuver => 
                    this.setState(previousState => ({
                        maneuvers: [...previousState.maneuvers, maneuver.instruction]
                      })
                ))
                this.setState({
                    instructions: route.leg[0].maneuver,
                    isLoadingInstructions: true,
                    startingSummary: route.waypoint[0].label,
                    endingSummary: route.waypoint[1].label,
                    modeSummary: route.mode.transportModes[0],
                })

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

    componentDidMount() {
        const H = window.H; // Para que funcione en React hay que ponerle window a todos los "H"
        // Pasas tu Key
        const platform = new H.service.Platform({
            apikey: "cbHG8o5UmCH1wWYcAvvSXlUJeIDjr3CMPE9geRW7Gqw"
        });
        const defaultLayers = platform.createDefaultLayers();
        //Empieza a renderear el mapa
        const map = new H.Map(
            this.mapRef.current,
            defaultLayers.vector.normal.map,
            {
                center: { lat: this.state.center.lat, lng: this.state.center.lng },
                zoom: 18,
                pixelRatio: window.devicePixelRatio || 1
            }
        );
        console.log('Center when DidMount', this.state.center.lat, this.state.center.lng)

        // Función para centrar con tu IP si falla la location de tu Browser
        const ipLookUp = () => {
            fetch('https://ipapi.co/json/')
                .then(function(response) {
                    return response.json();
                })
                .then(function(data) {
                    console.log(data);
                    map.setCenter({ lat: data.latitude, lng: data.longitude });
                    map.setZoom(16);
                });
        }

        // Función para centrar el mapa en tu location
        function moveMapToCenter(map) {
            const location = window.navigator && window.navigator.geolocation;
            if (location) {
                // check if geolocation is supported/enabled on current browser
                location.getCurrentPosition(
                    position => {
                        // for when getting location is a success
                        console.log('latitude', position.coords.latitude,
                            'longitude', position.coords.longitude);
                        map.setCenter({ lat: position.coords.latitude, lng: position.coords.longitude });
                        map.setZoom(16);
                        
                        var locationMarker = new H.map.Marker({lat: position.coords.latitude, lng:position.coords.longitude});
                        map.addObject(locationMarker);
                        
                    },
                    function error(error_message) {
                        // for when getting location results in an error
                        console.error('An error has occured while retrieving location', error_message)
                        // Buscar ubicación por IP (menos preciso)
                        ipLookUp()
                    }
                );
            } else {
                // geolocation is not supported
                // get your location some other way
                console.log('geolocation is not enabled on this browser')
                // Buscar ubicación por IP (menos preciso)
                ipLookUp()
            }
        }
        moveMapToCenter(map)


        // MapEvents enables the event system
        // Behavior implements default interactions for pan/zoom (also on mobile touch environments)
        // This variable is unused and is present for explanatory purposes
        const behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));

        // Create the default UI components to allow the user to interact with them
        // This variable is unused
        const ui = H.ui.UI.createDefault(map, defaultLayers);


        // Guarda el mapa en el estado
        this.setState({ map });
        console.log('Mapa en el estado', map)
    }

    componentWillUnmount() {
        this.state.map.dispose();
    }

    render() {
        return (
        <div className='divMap'>
            <Routing 
            calculateRoute={this.calculateRoute.bind(this)}
            map={this.state.map}
            center={this.state.center}/>
            <div ref={this.mapRef} className='map'/>
            <RouteSummary 
            instructions={this.state.instructions}
            isLoadingInstructions={this.state.isLoadingInstructions}
            startingSummary={this.state.startingSummary}
            endingSummary={this.state.endingSummary}
            modeSummary={this.state.modeSummary}
            maneuvers={this.state.maneuvers}/>
        </div>
        )
    }
}

export default Map;
