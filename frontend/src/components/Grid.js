import React from "react";
import Widget from "./Widget";
import BigWidget from "./BigWidget";
import '../css/Grid.css'

class Grid extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      flag1: window.flag
    };
  }
  componentDidMount() {
    const savedValue = localStorage.getItem('111');
    if (savedValue) {
      
      this.setState({ flag1: savedValue });
    }
  }

  componentDidUpdate() {
    localStorage.setItem('111', this.state.flag1);
    
  }
  shouldComponentUpdate(nextState) {
    
    return nextState.flag1 !== this.state.flag1;
  }
  render() {
    
    window.addEventListener('myGlobalVarChanged', (event) => {
      window.location.reload();
      this.setState({ flag1: event.detail });
    });
    
    return (
      <div>
        {(this.state.flag1 ==1 || this.state.flag1 ==0) &&
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
      {this.state.flag1 ==2  &&
        <div className="grid-flex">
          <div className="grid2">
            
              <div className="widget1">
              <BigWidget />
              </div>
              <div className="widget1">
              <BigWidget />
              </div>
              <div className="widget1">
              <BigWidget />
              </div>
              <div className="widget1">
              <BigWidget />
              </div>

          </div>
        </div>
      }
      {this.state.flag1 ==3  &&
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