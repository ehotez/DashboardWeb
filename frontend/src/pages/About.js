import React from "react";
import Widget from "../components/Widget";
import '../css/Grid.css'


class Grid extends React.Component {
  render() {
    return (
      <div className="grid">
        <Widget />
        <Widget />
        <Widget />
        <Widget />
        <Widget />
        <Widget />
        <Widget />
        <Widget />
        <Widget />
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