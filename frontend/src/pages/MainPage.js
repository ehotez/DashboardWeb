import '../css/App.css';
import React, {useState} from 'react';
import Sidebar from '../components/Sidebar';

class MainPage extends React.Component {
render(){
  return (
    <nav>
    <Sidebar/>
    </nav>
  );
}
}

export default MainPage;
