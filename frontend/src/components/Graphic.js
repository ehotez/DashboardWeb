import React, { Component } from 'react';
import CanvasJSReact from '../canvasjs.react';
import '../css/Grid.css';

var CanvasJSChart = CanvasJSReact.CanvasJSChart;
var dps = [];   //dataPoints.
var xVal = dps.length + 1;
var yVal = 15;
var updateInterval = 1000;
var intervalId = 0;

class Graphic extends Component {
  constructor() {
    super();
    this.chart = null;
    intervalId = 0;
    this.fetchData = this.fetchData.bind(this);

  }
  fetchData() {
    fetch("http://172.20.6.171:9988")
      .then((response) => response.json())
      .then((data) => {
        // Обновление данных графика
        dps = data[0].data.x_values.map((item, index) => ({ x: item, y: data[0].data.y_values[index] }));
        this.chart.options.data[0].dataPoints = dps;
        // Перерисовка графика
        this.chart.render();
      })
      .catch((error) => {
        console.error('Ошибка при получении данных:', error);
      });
  }

  componentDidMount() {
    // Запуск функции fetchData с интервалом 10 секунд
    intervalId = setInterval(this.fetchData, 1000);
  }

  componentWillUnmount() {
    // Очистка интервала перед размонтированием компонента
    clearInterval(intervalId);
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
        height: "calc(49.5vh)"
      };
    } else if (widgetId[0] === '2x3' && widgetId[2] === '0') {
      var containerProps = {
        height: "calc(66vh)"
      };
    } else {
      var containerProps = {
        height: "calc(33vh)"
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
