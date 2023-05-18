import Grid from '../components/Grid';
import '../css/App.css';
import '../css/Sidebar.css';
import React from 'react';
import $ from 'jquery';

var deleteInterval = 0;

class MainPage extends React.Component {

  constructor() {
    super();
    this.deleteData = this.deleteData.bind(this)
  }

  deleteData() {
    fetch("http://localhost/DashboardWeb/yii2-basic/web/source/delete-old-files")
      .then((response) => response.json())
      .then(() => {
        console.log('delete')
      })
      .catch(error => console.log(error));
  }

  componentDidMount() {
    deleteInterval = setInterval(this.deleteData, 30000); //30 sec
    $(".main-h").css('background', 'white');
    $(".source-h").css('background', 'none');
    $(".grid-size").css('display', 'block');
    $(".grid-size").css('background', 'none');
    $(".grid-popup").css('display', 'none');
  }

  componentWillUnmount() {
    clearInterval(deleteInterval);
  }

  render() {
    return (
      <Grid />
    );
  }
}

export default MainPage;
