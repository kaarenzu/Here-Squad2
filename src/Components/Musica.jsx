import React, { Fragment } from 'react';
import YouTube from 'react-youtube';
import '../Css/musica.css';
import Form from 'react-bootstrap/Form'

class VideosYoutube extends React.Component {
  constructor() {
    super();
    this.state = { videoID: "FjHGZj2IjBk" }
  }

  handleChangeId = e => {
    const valorId = e.target.value;
    this.setState({
      videoID: valorId
    })
  }
  
  render() {
    const opts = {
      height: '250',
      width: '350',
      playerVars: {
        autoplay: 1
      }
    };
    return (
      <Fragment>
        <div className="containerVideos">
          <header className="headerMusica">
            <h1 className="headerText textCom">Librería de videos</h1>
          </header>
          <h6 className="headerTextMusica">
            Aquí podrás ver y escuchar videos de música,
            relajación y meditación cuando lo necesites.
          </h6>
          <h6 className="headerTextMusica categories">
            Categorías:
          </h6>
          <section className="sectionVideos">
            <form className="rating-form" onChange={e => this.handleChangeId(e)}>
              <Form.Group controlId="exampleForm.ControlSelect1">
                <Form.Control as="select" onChange={e => this.handleChangeId(e)} className="selectVideo">
                  <option value="" disabled selected hidden>Música</option>
                  <option value="FjHGZj2IjBk">Meditation - Monoman</option>
                  <option value="EGuGPJfHPjo">ＣＨＩＬＬ ＆ ＲＩＤＥ</option>
                  <option value="degKbH3z2qU">Meditation - Monoman</option>
                </Form.Control>
              </Form.Group>
              <Form.Group controlId="exampleForm.ControlSelect1" >
                <Form.Control as="select" onChange={e => this.handleChangeId(e)} className="selectVideo" >
                  <option value="" disabled selected hidden>Meditación</option>
                  <option value="0JsYzIz4PXU">Meditación guiada para calmar la mente</option>
                  <option value="EVaGLTs54hU">Meditación para soltar y fluir</option>
                  <option value="kqlIxuToi3k">Meditación para eliminar el estrés</option>
                </Form.Control>
              </Form.Group>
              <Form.Group controlId="exampleForm.ControlSelect1" >
                <Form.Control as="select" onChange={e => this.handleChangeId(e)} className="selectVideo" >
                  <option value="" disabled selected hidden>Ejercicios</option>
                  <option value="B4Sui9TYzEA">Ejercicio de respiración</option>
                  <option value="Ljub3eX_iQU">Ejercicio para trabajar la ANSIEDAD</option>
                  <option value="qd9lmvDkJOQ">8 ejercicios para calmar la mente</option>
                </Form.Control>
              </Form.Group>
            </form>
            <div className="videoDiv">
              <YouTube
                    videoId={this.state.videoID}
                    opts={opts}
                    onReady={this._onReady} />
            </div>
          </section>
        </div>
      </Fragment >
    )
  }
}
export default VideosYoutube;