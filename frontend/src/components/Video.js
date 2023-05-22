import React, { Component } from "react";
import ReactHlsPlayer from "react-hls-player";
import '../css/Grid.css';

class Video extends Component {
  constructor(props) {
    super(props);
    this.state = {
      multiplier: 0,
    }
    this.playerRef = React.createRef();
    this.name = this.props.name;
    this.rtsp_link = this.props.link.toString();
    this.pid = -1;
    this.id = this.props.id;
    this.screenW = window.innerWidth - 80;
    this.screenH = window.innerHeight;
    this.link = `http://localhost/DashboardWeb/frontend/src/video/${this.name}.m3u8`;
  }

  componentDidMount() {
    if (localStorage.getItem('deleteOn') === '0') {
      localStorage.setItem('reload', '1')
    }

    if (localStorage.getItem('size') === '3x3') {
      this.setState({ multiplier: 0.329 })
    } else if (localStorage.getItem('size') === '2x2') {
      this.setState({ multiplier: 0.50 })
      console.log(this.id)
    } else if (localStorage.getItem('size') === '2x3' && this.id === 'widget-0') {
      this.setState({ multiplier: 0.66 })
    }

    if (localStorage.getItem((localStorage.getItem("auth_user") + "-" + localStorage.getItem('size') + "-" + this.id + 'v')) === '1') {
      fetch(`http://localhost/DashboardWeb/yii2-basic/web/source/get-video/?link=${this.rtsp_link}&name=${this.name}`, {
        method: "POST",
      })
        .then((response) => response.json())
        .then((result) => {
          this.setState({ pid: result })
        });
    }
    localStorage.setItem((localStorage.getItem("auth_user") + "-" + localStorage.getItem('size') + "-" + this.id + 'v'), '2')
    //console.log(localStorage.getItem((localStorage.getItem("auth_user") + "-" + localStorage.getItem('size') + "-" + this.id + 'v')))
  }

  componentWillUnmount() {

    fetch(`http://localhost/DashboardWeb/yii2-basic/web/source/stop-video/?pid=${this.pid}`, {
      method: "POST",
    })
      .then((response) => response.json())
      .then((result) => {
        //this.setState({ pid: -1 })
      });
    localStorage.setItem((localStorage.getItem("auth_user") + "-" + localStorage.getItem('size') + "-" + this.id + 'v'), '1')
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
          width={this.screenW * this.state.multiplier}
          height={this.screenH * this.state.multiplier}
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
