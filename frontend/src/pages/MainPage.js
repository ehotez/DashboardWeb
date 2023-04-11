import Grid from '../components/Grid';
import '../css/App.css';
import '../css/Sidebar.css';
import React, { useState } from 'react';
import $ from 'jquery';

class MainPage extends React.Component {
  componentDidMount(){
    $(".main-h").css('background', 'white');
    $(".source-h").css('background', 'none');
  }
  render() {
    return (
      <Grid />
    );
  }
}

export default MainPage;
