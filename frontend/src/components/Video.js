import React, { Component } from "react";
import ReactHlsPlayer from "react-hls-player";
import '../css/Grid.css';


class Video extends Component {
  constructor(props) {
    super(props);
    this.playerRef = React.createRef();
    this.source = this.props.link.toString();
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
          height="calc(100vh);"
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
