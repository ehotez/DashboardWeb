import React, { Component } from "react";
import ReactHlsPlayer from "react-hls-player";
import '../css/Grid.css';


class Video extends Component {
  constructor(props) {
    super(props);
    this.playerRef = React.createRef();
    this.source = "https://apptrailers.itunes.apple.com/itunes-assets/PurpleVideo114/v4/be/64/3f/be643f42-0b0b-fa18-6e5a-288af1309d85/P240983652_default.m3u8";
  }

  render() {
    return (
      <div className="video">
        <ReactHlsPlayer
          playerRef={this.playerRef}
          src={this.source}
          muted={true}
          autoPlay={true}
          controls={true}
          width="100%"
          height="300vh;"
          hlsConfig={{
            autoStartLoad: true,
            startPosition: -1,
            debug: false
          }}
        />
      </div>
    );
  }
}

export default Video;
