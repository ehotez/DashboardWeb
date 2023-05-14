import Grid from '../components/Grid';
import '../css/App.css';
import '../css/Sidebar.css';
import React from 'react';
import $ from 'jquery';


class MainPage extends React.Component {
  componentDidMount(){
    if (localStorage.getItem("reload") ==="1"){
      //window.location.reload();
      localStorage.setItem("reload", '0')
    }
    $(".main-h").css('background', 'white');
    $(".source-h").css('background', 'none');
    $(".grid-size").css('display', 'block');
    $(".grid-size").css('background', 'none');
    $(".grid-popup").css('display', 'none');
  }
  render() {
    return (
      <Grid />
    );
  }
}

export default MainPage;
