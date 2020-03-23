// src/DisplayMapClass.js
import * as React from 'react';

class Map extends React.Component {
    mapRef = React.createRef();
    state = {
      map: null,
      center: {
          lat: -33.444379,
          lng: -70.650400
      }
    };

    // getLocation() {
    //     const  location = window.navigator && window.navigator.geolocation;
    //     if (location) {
    //         // check if geolocation is supported/enabled on current browser
    //         location.getCurrentPosition(
    //          position => {
    //         debugger

    //            // for when getting location is a success
    //            console.log('latitude', position.coords.latitude, 
    //                        'longitude', position.coords.longitude);
    //             this.setState({
    //                 center: {lat: position.coords.latitude,
    //                         lng: position.coords.longitude }
    //             })
    //          },
    //         function error(error_message) {
    //           // for when getting location results in an error
    //           console.error('An error has occured while retrieving location', error_message)
    //         }  
    //       );
    //       } else {
    //         // geolocation is not supported
    //         // get your location some other way
    //         console.log('geolocation is not enabled on this browser')
    //       }
    // }
    componentWillMount() {
        const getLocation = () => {
            const  location = window.navigator && window.navigator.geolocation;
            if (location) {
                // check if geolocation is supported/enabled on current browser
                location.getCurrentPosition(
                 position => {
                debugger
    
                   // for when getting location is a success
                   console.log('latitude', position.coords.latitude, 
                               'longitude', position.coords.longitude);
                    this.setState({
                        center: {lat: position.coords.latitude,
                                lng: position.coords.longitude }
                    })
                    console.log('New State', this.state.center.lat, this.state.center.lng )
                 },
                function error(error_message) {
                  // for when getting location results in an error
                  console.error('An error has occured while retrieving location', error_message)
                }  
              );
              } else {
                // geolocation is not supported
                // get your location some other way
                console.log('geolocation is not enabled on this browser')
              }
        }
        getLocation();
        
    }


    componentDidMount() {
      const H = window.H;
      const platform = new H.service.Platform({
          apikey: "cbHG8o5UmCH1wWYcAvvSXlUJeIDjr3CMPE9geRW7Gqw"
      });
  
      const defaultLayers = platform.createDefaultLayers();
  
      const map = new H.Map(
        this.mapRef.current,
        defaultLayers.vector.normal.map,
        {
          center: { lat: this.state.center.lat, lng: this.state.center.lng},
          zoom: 16,
          pixelRatio: window.devicePixelRatio || 1
        }
      );
      console.log('Center when DidMount', this.state.center.lat, this.state.center.lng )
      // MapEvents enables the event system
      // Behavior implements default interactions for pan/zoom (also on mobile touch environments)
      // This variable is unused and is present for explanatory purposes
      const behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));
  
      // Create the default UI components to allow the user to interact with them
      // This variable is unused
      const ui = H.ui.UI.createDefault(map, defaultLayers);
  
      this.setState({ map });
    }
  
    componentWillUnmount() {
      this.state.map.dispose();
    }
  
    render() {
      return <div ref={this.mapRef} style={{ height: "1000px" }} />;
    }
  }


export default Map;
