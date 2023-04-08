import React, { Component } from 'react';
import '../css/Sidebar.css';
import { NavLink as Link } from 'react-router-dom';
import MaterialIcon from 'material-icons-react';
import styled from 'styled-components';
export const NavBtn = styled(Link)`
font-size: 15px;
text-align: center;
text-decoration: none;
height:10%;
width:100%;
border: none;
background: transparent;
line-height: 85px; 
box-sizing: border-box; 
cursor: pointer;
  &:hover {
    background: white;
    color: black;
  }
  &:active, &:focus{
    background: white;
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
        <NavBtn to='/main'><MaterialIcon icon="dashboard" size={30} /></NavBtn>
        <NavBtn to='/about'><MaterialIcon icon="dashboard_customize" size={30} /></NavBtn>
        <NavBtn to='/sources'><MaterialIcon icon="source" size={30} /></NavBtn>
        <NavBtn to='/'><MaterialIcon icon="logout" size={30} /> </NavBtn>
      </div>
    );
  }
}

export default Sidebar;