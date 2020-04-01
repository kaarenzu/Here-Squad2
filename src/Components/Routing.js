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
            transportMode: 'publicTransport'
        }
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
        fetch(`https://autosuggest.search.hereapi.com/v1/autosuggest?at=${this.props.center.lat},${this.props.center.lng}&limit=4&q=${point0}+die&apiKey=cbHG8o5UmCH1wWYcAvvSXlUJeIDjr3CMPE9geRW7Gqw`)
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
                    this.props.calculateRoute(this.state.startingPoint, this.state.endingPoint, this.state.transportMode))
                .catch(err =>
                    console.error(err))

            } else if (this.state.startingPoint === null) {
                // Promesa del Geocoding
                const addressGeocoded = this.geocodingAdresses(point0)
                    .then(address =>
                        this.setStartingPoint(address))
                    .then(() =>
                        this.props.calculateRoute(this.state.startingPoint, this.state.endingPoint, this.state.transportMode))
                    .catch(err =>
                        console.error(err))
            } else if (this.state.endingPoint === null) {
                    // Promesa del Geocoding
                    const addressGeocoded = this.geocodingAdresses(point1)
                    .then(address =>
                        this.setEndingPoint(address))
                    .then(() =>
                        this.props.calculateRoute(this.state.startingPoint, this.state.endingPoint, this.state.transportMode))
                    .catch(err =>
                        console.error(err))
            }
        } else {
            this.props.calculateRoute(this.state.startingPoint, this.state.endingPoint, this.state.transportMode)
        }
    }

    handleChangeRadio = e => {
        const transport = e.target.value
        this.setState({
            transportMode: transport
        })
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
                <div className="divRadioAndButton">
                    <div className="containerRadioBtn" onChange={e => this.handleChangeRadio(e)}>
                        <form className="rating-form">
                            <label for="super-happy">
                                <input type="radio" name="RadioOption" className="super-happy" id="super-happy" value="publicTransport" required defaultChecked/>
                                <img className="svg" src={require('../img/bus.png')} alt="Public Transport"/>
                            </label>
                            <label for="happy">
                                <input type="radio" name="RadioOption" className="happy" id="happy" value="car" required/>
                                <img className="svg" src={require('../img/pickup-car.png')} alt="Car"/>
                            </label>
                            <label for="neutral">
                                <input type="radio" name="RadioOption" className="neutral" id="neutral" value="pedestrian" required/>
                                <img className="svg" src={require('../img/walk.png')} alt="Walking"/>
                            </label>
                        </form>
                    </div>
                    <img src={require('../img/search.png')} alt="Search button" className="buttonRoute" onClick={e => this.handleClickButton(e)}/>
                </div>
            </div>
        );
    }
}

export default Routing;