import React, { Component } from 'react';
import CanvasJSReact from '../canvasjs.react';
import '../css/Grid.css';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
var dps = [{ x: 1, y: 10 }, { x: 2, y: 13 }];   //dataPoints.
var xVal = dps.length + 1;
var yVal = 15;
var updateInterval = 1000;
var intervalId = 0;

class Graphic extends Component {
  constructor() {
    super();
    intervalId = 0;
    this.updateChart = this.updateChart.bind(this);
  }
  componentDidMount() {
    this.intervalId = setInterval(this.updateChart, updateInterval);
  }

  componentWillUnmount() {
    clearInterval(this.intervalId);
    console.log('clearing');
  }

  updateChart() {
    yVal = yVal + Math.round(5 + Math.random() * (-5 - 5));
    dps.push({ x: xVal, y: yVal });
    xVal++;
    // if (dps.length > 15) {
    //   dps.shift();
    // }
    this.chart.options.axisX.viewportMinimum = xVal - 20;
    this.chart.options.axisX.viewportMaximum = xVal;

    this.chart.render();
  }

  render() {
    const options = {
      creditText: " ",
      creditHref: " ",
      zoomEnabled: true,
      height: 250,
      zoomType: 'x',

      axisX: {
        viewportMinimum: 0,
        viewportMaximum: 0,
        crosshair: {
          enabled: true,
          snapToDataPoint: true
        }
      },
      axisY: {
        includeZero: false,
      },
      legend: {
        horizontalAlign: "right",
        verticalAlign: "center"
      },
      title: {
        text: this.props.mass.toString()
      },
      data: [{
        type: "line",
        dataPoints: dps
      }]
    }
    return (
      <div>
        <CanvasJSChart options={options}
          onRef={ref => this.chart = ref}
        />
        {/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
      </div>
    );
  }
}
export default Graphic;                         
