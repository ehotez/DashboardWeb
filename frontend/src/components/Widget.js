import React, { Component } from 'react';
import '../css/Grid.css'
import '../css/Sidebar.css'
import $ from 'jquery'

class Widget extends Component {
  static idCounter = 0;
  constructor(props) {
    super(props);
    this.id = `widget-${Widget.idCounter++}`;
    this.state = {
      value: '',
      flag1: window.flag,
      isPopupVisible: false,
      isShowVisible: false,
      isCloseVisible: false
    };
    this.id1 = this.id+ " "+ this.state.flag1
  }

  handleChange = (event) => {
    this.setState({ value: event.target.value });
    this.setState({ isShowVisible: false });
    
  }
  
  deleteChange = () => {
    this.setState({ value: '' });
  }

  handleButtonClick = () => {
    this.setState({ isPopupVisible: true });
  }

  handlePopupClose = () => {
    this.setState({ isPopupVisible: false });
  }
  handleCloseShow = () => {
    this.setState({ isCloseVisible: true });
  }

  handleShowClose = () => {
    this.setState({ isShowVisible: true });
  }

  handleShowShow = () => {
    this.setState({ isShowVisible: false });
    this.setState({ isCloseVisible: false });
    this.deleteChange();
  }

  componentDidMount() {
    $(".main-h").css('background', 'white');
    const savedValue = localStorage.getItem(this.id1);
    if (savedValue) {
      this.setState({ value: savedValue });
      this.setState({ isShowVisible: savedValue });
      this.setState({ isCloseVisible: savedValue });
      //this.setState({ isPopupVisible: savedValue });
    }
  }

  handlePopupSave = () => { 
    this.setState({ isPopupVisible: false }); 
    this.handleShowClose();
    this.handleCloseShow();
  } 

  componentDidUpdate() {
    localStorage.setItem(this.id1, this.state.value);
  }
  render() {
    window.addEventListener('myGlobalVarChanged', (event) => {
      this.setState({ flag1: event.detail });
    });
    return (
      <>
        {!this.state.isShowVisible &&
          <button className='add-widget-button' onClick={this.handleButtonClick}>+</button> 
        }
        {this.state.isPopupVisible && 
          <div className="popup"> 

            <input type="text" value={this.state.value} onChange={this.handleChange} /> 
            <button onClick={this.handlePopupSave}>Save</button> 
          </div> 
        } 
        {this.state.isCloseVisible &&
            <button className='close' onClick={this.handleShowShow}>X</button> 
        }
        {!this.state.isPopupVisible && this.state.value && <div className='view'>{this.state.value}</div>} 
      </>
    );
  }
}

export default Widget;