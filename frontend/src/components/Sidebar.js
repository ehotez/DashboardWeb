import React, { Component } from 'react';
import '../css/Sidebar.css';
import {Navigate} from 'react-router-dom';

class Sidebar extends Component {
  state = {
    barrierVisible: [true, true, true, true],
    isSource: false,
    isMain: false,
    isGrid: false,

  };

  handleMainClick() {
    this.setState({isMain:true})
  }

  handleGridClick() {
    this.setState({isGrid:true})
  }

  handleSourceClick() {
    this.setState({isSource:true})
  }

  render() {

    return (
      <div className="sidebar-container">

        <button className="sidebar-button" onClick={() => this.handleMainClick()}>
          Главная
        </button>
        <button className="sidebar-button" onClick={() => this.handleSourceClick()}>
          Источники
        </button>
        <button className="sidebar-button" onClick={() => this.handleButtonClick(2)}>
          Сетка
        </button>
        <button className="sidebar-button-logout" onClick={() => this.handleButtonClick(3)}>
          Выйти
        </button>
        { this.state.isSource &&(<Navigate to='/sources' replace={true}/>)}
        { this.state.isMain &&(<Navigate to='/main' replace={true}/>)}
      </div>
    );
  }
}

export default Sidebar;