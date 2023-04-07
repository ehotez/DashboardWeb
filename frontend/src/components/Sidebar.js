import React, { Component } from 'react';
import '../css/Sidebar.css';

class Sidebar extends Component {
  state = {
    barrierVisible: [true, true, true, true],
  };

  handleButtonClick = (index) => {
    const newVisibility = [...this.state.barrierVisible];
    newVisibility[index] = false;
    this.setState({ barrierVisible: newVisibility });
  };

  render() {
    const { barrierVisible } = this.state;

    return (
      <div className="sidebar-container">
        
          <button className="sidebar-button" onClick={() => this.handleButtonClick(0)}>
            Button 1
          </button>
          <button className="sidebar-button" onClick={() => this.handleButtonClick(1)}>
            Button 2
          </button>
          <button className="sidebar-button" onClick={() => this.handleButtonClick(2)}>
            Button 3
          </button>
          <button className="sidebar-buttonlogout" onClick={() => this.handleButtonClick(3)}>
            Button 4
          </button>
        
        {barrierVisible.map((visible, index) => (
          visible && <div className="barrier" key={index}></div>
        ))}
      </div>
    );
  }
}

export default Sidebar;