import React, { Component } from 'react';
import '../css/Sidebar.css';
import { Navigate } from 'react-router-dom';
import { NavLink as Link } from 'react-router-dom';
import styled from 'styled-components';
export const NavBtn = styled(Link)`
font-size: 15px;
margin: 10px 10px;
text-align: center;
text-decoration: none;
border-radius:5px;
height:10%;
width:auto;
border: none;
background: grey;
cursor: pointer;
  &:hover {
    background: white;
    color: black;
  }
  &:active, &:focus{
    background: pink;
    color: black;
  }
  &:visited,&:link{
    text-decoration: none;
  }
`;
class Sidebar extends Component {
  state = {
    barrierVisible: [true, true, true, true],
    isSource: false,
    isMain: false,
    isGrid: false,

  };

  handleMainClick() {
    this.setState({ isMain: true })
  }

  handleGridClick() {
    this.setState({ isGrid: true })
  }

  handleSourceClick() {
    this.setState({ isSource: true })
  }

  render() {

    return (
      <div className="sidebar-container">
        <NavBtn to='/main'>Главная</NavBtn>
        <NavBtn to='/about'>Сетка</NavBtn>
        <NavBtn to='/sources'>Источники</NavBtn>
        <NavBtn to='/'>Выйти</NavBtn>
      </div>
    );
  }
}

export default Sidebar;