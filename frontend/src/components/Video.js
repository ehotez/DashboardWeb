import React, { Component } from "react";
import ReactHlsPlayer from "react-hls-player";
import '../css/Grid.css';

class Video extends Component {
  constructor(props) {
    super(props);
    this.playerRef = React.createRef();
    this.name = this.props.name;
    this.rtsp_link = this.props.link.toString();
    this.pid = -1;
    this.id = this.props.id;
    this.link = `http://localhost/DashboardWeb/frontend/src/video/${this.name}.m3u8`;
  }

  componentDidMount() {
    if (localStorage.getItem((localStorage.getItem("auth_user") + "-" + localStorage.getItem('size') + "-" + this.id + 'v')) === '1') {
    fetch(`http://localhost/DashboardWeb/yii2-basic/web/source/get-video/?link=${this.rtsp_link}&name=${this.name}`, {
      method: "POST",
    })
      .then((response) => response.json())
      .then((result) => {
        console.log(result)
        this.setState({ pid: result })
      });
    }
    localStorage.setItem((localStorage.getItem("auth_user") + "-" + localStorage.getItem('size') + "-" + this.id + 'v'),'2')
    console.log(localStorage.getItem((localStorage.getItem("auth_user") + "-" + localStorage.getItem('size') + "-" + this.id + 'v')))
  }

  componentWillUnmount() {
    fetch(`http://localhost/DashboardWeb/yii2-basic/web/source/stop-video/?pid=${this.pid}`, {
      method: "POST",
    })
      .then((response) => response.json())
      .then((result) => {
        //this.setState({ pid: -1 })
        console.log(result);
      });
      localStorage.setItem((localStorage.getItem("auth_user") + "-" + localStorage.getItem('size') + "-" + this.id + 'v'),'1')
    console.log('unmount')
  }

  render() {

    return (
      <div className="video">
        <ReactHlsPlayer
          playerRef={this.playerRef}
          src={this.link}
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
