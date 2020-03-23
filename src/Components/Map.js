// src/DisplayMapClass.js
import * as React from 'react';

class Map extends React.Component {
    mapRef = React.createRef();
    constructor(props) {
        super(props)
        this.state = {
            map: null,
            center: {
                lat: -33.444379,
                lng: -70.650400
            }
        };

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
                        map.setZoom(18);
                        
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
        return <div ref={this.mapRef} style={{ height: "1000px" }} />;
    }
}


export default Map;
