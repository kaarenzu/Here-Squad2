import React, { Fragment } from 'react';
import YouTube from 'react-youtube';
import '../Css/musica.css';
import Form from 'react-bootstrap/Form'

class VideosYoutube extends React.Component {
  constructor() {
    super();
    this.state = { id1: "videoos" }
  }

  handleChangeId = e => {
    const valorId = e.target.value;
    this.setState({
      id1: valorId
    })
  }
  
  render() {
    const opts = {
      height: '200',
      width: '300',
      playerVars: {
        autoplay: 1
      }
    };
    return (
      <Fragment>
        <div className="containerVideos">
          <header className="headerMusica">
            <h1 className="headerText textCom">Librería de música</h1>
          </header>
          <h6 className="headerTextMusica">
            Aquí podrás ver y escuchar videos de música,
            relajación y meditación cuando lo necesites.
          </h6>
          <form className="rating-form" onChange={e => this.handleChangeId(e)}>
            {/* <label for="super-happy" className="videos">
              <input type="radio" name="RadioOption" className="super-happy" id="super-happy"
                value="B4Sui9TYzEA" required defaultChecked />
              <h1 type="button" className="btnMusica" alt="B4Sui9TYzEA">Relajación</h1>
            </label>
              
            <label for="happy" className="videos">
              <input type="radio" name="RadioOption" className="" id="happy"
                value="ihQbuY1zUf0" required />
              <h1 className="btnMusica" alt="ihQbuY1zUf0">Música relajante</h1>
            </label> */}
            <Form.Group controlId="exampleForm.ControlSelect1">
             <Form.Label>Example select</Form.Label>
              <Form.Control as="select">
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
              </Form.Control>
            </Form.Group>

          </form>
          <YouTube
                videoId={this.state.id1}
                opts={opts}
                onReady={this._onReady} />
        </div>
      </Fragment >
    )
  }
}
export default VideosYoutube;