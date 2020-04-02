import React from 'react';
import YouTube from 'react-youtube'
import '../Css/musica.css'

class VideosYoutube extends React.Component {
  render() {
    const opts = {
      height: '200',
      width: '300',
      playerVars: { // https://developers.google.com/youtube/player_parameters
        autoplay: 1
      }
    };
 
    return (
      <div className="containerVideos">
         <YouTube
        videoId="B4Sui9TYzEA"
        opts={opts}
        onReady={this._onReady}
      />
      <YouTube
      videoId="ihQbuY1zUf0"
      opts={opts}
      onReady={this._onReady}
    />

      </div>
     
    );
  }
 
  _onReady(event) {
    // access to player in all event handlers via event.target
    event.target.pauseVideo();
  }
}
export default VideosYoutube;