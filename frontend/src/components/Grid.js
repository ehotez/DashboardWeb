import React from "react";
import Widget from "./Widget";

import '../css/Grid.css'

class Grid extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      flag1: ''
    };
  }

  componentDidMount() {
    const savedValue = localStorage.getItem('size');
    if (savedValue) {
      this.setState({ flag1: savedValue });
    }
  }

  handleStorageChange(){
    window.location.reload();
  }

  render() {
    
    return (
      <div>
        {(this.state.flag1 =='3x3') &&
          <div className="grid-flex">
            <div className="grid">
            <div className="widget">
              <Widget />
              </div>
              <div className="widget">
              <Widget />
              </div>
              <div className="widget">
              <Widget />
              </div>
              
              <div className="widget">
              <Widget />
              </div>
              <div className="widget">
              <Widget />
              </div>
              <div className="widget">
              <Widget />
              </div>
              <div className="widget">
              <Widget />
              </div>
              <div className="widget">
              <Widget />
              </div>
              <div className="widget">
              <Widget />
              </div>
            </div>
        </div>
        }
      {this.state.flag1 =='2x2'  &&
        <div className="grid-flex">
          <div className="grid2">
            
              <div className="widget1">
              <Widget />
              </div>
              <div className="widget1">
              <Widget />
              </div>
              <div className="widget1">
              <Widget />
              </div>
              <div className="widget1">
              <Widget />
              </div>

          </div>
        </div>
      }
      {this.state.flag1 =='2x3'  &&
        <div className="grid-flex">
          <div className="grid">
            
              <div className=" widget-big">
              <Widget />
              </div>
              <div className="widget">
              <Widget />
              </div>
              <div className="widget">
              <Widget />
              </div>
              <div className="widget">
              <Widget />
              </div>
              <div className="widget">
              <Widget />
              </div>
              <div className="widget">
              <Widget />
              </div>

          </div>
        </div>
      }
      </div>
    );
  }
}
export default Grid;




/*const About = () => {
  return (
    <div>
      <h1>About Page</h1>
    </div>
  );
};

export default About;
*/
/* ТУТ ПРОИЗОШЕЛ ОБСЕР С RSTP ЗАПРОСОМ
import React from 'react';
import { View } from 'react-native';
import VLCPlayer from 'react-native-vlc-player';

class VideoPlayer extends React.Component {
  onError = (event) => {
    console.log('Error:', event);
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <VLCPlayer
          style={{ width: '100%', height: 200 }}
          source={{
            uri: 'rtsp://your_video_stream_url'
          }}
          autoplay={true}
          resizeMode={'contain'}
          onError={this.onError}
        />
      </View>
    );
  }
}

export default VideoPlayer;
*/