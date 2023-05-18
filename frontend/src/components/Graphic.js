import React, { Component } from 'react';
import CanvasJSReact from '../canvasjs.react';
import '../css/Grid.css';

var CanvasJSChart = CanvasJSReact.CanvasJSChart;
var dps = [];   //dataPoints.
var intervalId = 0;

class Graphic extends Component {
  constructor(props) {
    super(props);
    this.chart = null;
    intervalId = 0;
    this.fetchData = this.fetchData.bind(this);
    this.time = Number(this.props.time)
    this.link = this.props.link
  }
  
  fetchData() {
    fetch(this.link)
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
    if(this.time === 0){
      console.log('no time')
      intervalId = setInterval(this.fetchData, 10*1000);
    }else{
      intervalId = setInterval(this.fetchData, this.time*1000);
    }
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
        text: this.props.name
      },
      data: [{
        type: "line",
        dataPoints: dps
      }]
    }
    var widgetId = (this.props.widget).split('-');
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
