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

`;
class Sidebar extends Component {
  state = {
    //isGrid: false,
  };

  handleLogoutClick() {
    fetch(`http://localhost/DashboardWeb/yii2-basic/web/user/identity`, {
      method: "POST",
    })
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
      });
  }

  // handleGridClick() {
  //   this.setState({ isGrid: true })
  // }

  // componentWillUnmount(){
  //   this.setState({isGrid:false})
  // }

  render() {

    return (
      <div className="sidebar-container">
        <NavBtn to='/main'><MaterialIcon icon="dashboard" size={30} /></NavBtn>
        <NavBtn><MaterialIcon icon="dashboard_customize" size={30} /></NavBtn>
        <NavBtn to='/sources'><MaterialIcon icon="source" size={30} /></NavBtn>
        <NavBtn onClick={this.handleLogoutClick.bind(this)} to='/'><MaterialIcon icon="logout" size={30} /> </NavBtn>
      </div>
    );
  }
}

export default Sidebar;