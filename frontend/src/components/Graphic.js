import React, { Component } from 'react';
import CanvasJSReact from '../canvasjs.react';
import '../css/Grid.css';

var CanvasJSChart = CanvasJSReact.CanvasJSChart;
var dps = [{ x: 1, y: 10 }, { x: 2, y: 5 }, { x: 3, y: 3 },
{ x: 4, y: 7 }, { x: 5, y: 11 }, { x: 6, y: 2 }, { x: 7, y: 9 }, { x: 8, y: 4 },
{ x: 9, y: -5 }, { x: 10, y: -1 }, { x: 11, y: 2 }, { x: 12, y: 3 }, { x: 13, y: 5 }, { x: 14, y: 1 }];   //dataPoints.
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
    var widgetId = (this.props.widget.toString()).split('-');
    if (widgetId[0] === '2x2') {
      var containerProps = {
        height: "calc(50vh)"
      };
    } else if (widgetId[0] === '2x3' && widgetId[2] === '1') {
      var containerProps = {
        height: "calc(66.66vh)"
      };
    } else {
      var containerProps = {
        height: "calc(33.33vh)"
      };
    }
    return (
      <div>
        <CanvasJSChart containerProps={containerProps} options={options}
          onRef={ref => this.chart = ref}
        />
        {/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
      </div>
    );
  }
}
export default Graphic;                         
