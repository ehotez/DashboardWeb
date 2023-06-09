import React from "react";
import Widget from "./Widget";

import '../css/Grid.css'

class Grid extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gridSize: '',
      widgets3x3: [
        { id: 0 },
        { id: 1 },
        { id: 2 },
        { id: 3 },
        { id: 4 },
        { id: 5 },
        { id: 6 },
        { id: 7 },
        { id: 8 }],
      widgets2x2: [
        { id: 0 },
        { id: 1 },
        { id: 2 },
        { id: 3 },
      ],
      widgets2x3: [
        { id: 0 },
        { id: 1 },
        { id: 2 },
        { id: 3 },
        { id: 4 },
        { id: 5 },
      ],
    };
  }

  componentDidMount() {
    var savedSize = localStorage.getItem('size');
    if (savedSize) {
      this.setState({ gridSize: savedSize });
    }

    var saved3x3 = JSON.parse(localStorage.getItem('3x3'));
    var saved2x2 = JSON.parse(localStorage.getItem('2x2'));
    var saved2x3 = JSON.parse(localStorage.getItem('2x3'));

    if (saved3x3) {
      this.setState({ widgets3x3: saved3x3 });
    }
    if (saved2x2) {
      this.setState({ widgets2x2: saved2x2 });
    }
    if (saved2x3) {
      this.setState({ widgets2x3: saved2x3 });
    }
  }
  handleDragStart = (e, index) => {
    e.dataTransfer.setData("index", index);
  }
  handleDragOver = (e) => {
    e.preventDefault();
    e.currentTarget.style.backgroundColor = "#ccc";
  }
  handleDragLeave = (e) => {
    e.currentTarget.style.backgroundColor = "";
    e.currentTarget.style.border = "";
  }
  handleDrop = (e, targetIndex, widget, flag) => {
    e.preventDefault();
    const index = e.dataTransfer.getData("index");
    if (index !== targetIndex.toString()) {
      if (flag == "3x3") {
        var widgets3x3 = widget;
        [widgets3x3[index], widgets3x3[targetIndex]] = [widgets3x3[targetIndex], widgets3x3[index]]
        this.setState({ widgets3x3 })
        localStorage.setItem('3x3', JSON.stringify(this.state.widgets3x3))
      }
      if (flag == "2x2") {
        const widgets2x2 = widget;
        [widgets2x2[index], widgets2x2[targetIndex]] = [widgets2x2[targetIndex], widgets2x2[index]]
        this.setState({ widgets2x2 })
        localStorage.setItem('2x2', JSON.stringify(this.state.widgets2x2))
      }
      if (flag == "2x3") {
        const widgets2x3 = widget;
        if (index != 0 && targetIndex != 0) {
          [widgets2x3[index], widgets2x3[targetIndex]] = [widgets2x3[targetIndex], widgets2x3[index]]
          this.setState({ widgets2x3 })
          localStorage.setItem('2x3', JSON.stringify(this.state.widgets2x3))
        }
      }
    }
    e.currentTarget.style.backgroundColor = "";
  }

  render() {
    return (
      <div>
        {this.state.gridSize === '3x3' &&
          <div className="grid-flex">
            <div className="grid">
              {this.state.widgets3x3.map((widget, index) => (
                <div key={widget.id} className="widget" draggable
                  onDragStart={(e) => this.handleDragStart(e, index)}
                  onDragOver={this.handleDragOver}
                  onDragLeave={(e) => this.handleDragLeave(e)}
                  onDrop={(e) => this.handleDrop(e, index, this.state.widgets3x3, this.state.gridSize)}>
                  <Widget widgetId={widget.id} />
                </div>
              ))}
            </div>
          </div>
        }
        {this.state.gridSize === '2x2' &&
          <div className="grid-flex">
            <div className="grid2">
              {this.state.widgets2x2.map((widget, index) => (
                <div key={widget.id} className="widget1" draggable
                  onDragStart={(e) => this.handleDragStart(e, index)}
                  onDragOver={this.handleDragOver}
                  onDragLeave={(e) => this.handleDragLeave(e)}
                  onDrop={(e) => this.handleDrop(e, index, this.state.widgets2x2, this.state.gridSize)}>
                  <Widget widgetId={widget.id} />
                </div>
              ))}
            </div>
          </div>
        }
        {this.state.gridSize === '2x3' &&
          <div className="grid-flex">
            <div className="grid">
              {this.state.widgets2x3.map((widget, index) => (
                <div key={widget.id} className={index === 0 ? "widget-big" : "widget"} draggable
                  onDragStart={(e) => this.handleDragStart(e, index)}
                  onDragOver={this.handleDragOver}
                  onDragLeave={(e) => this.handleDragLeave(e)}
                  onDrop={(e) => this.handleDrop(e, index, this.state.widgets2x3, this.state.gridSize)}>
                  <Widget widgetId={widget.id} />
                </div>
              ))}
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