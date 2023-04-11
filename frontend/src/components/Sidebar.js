import React, { Component } from 'react';
import '../css/Sidebar.css';
import { NavLink as Link } from 'react-router-dom';
import MaterialIcon from 'material-icons-react';
import styled from 'styled-components';
export const NavBtn = styled(Link)`
font-size: 15px;
text-align: center;
text-decoration: none;
height:80px;
width:100%;
border: none;
background: transparent;
line-height: 100px; 
box-sizing: border-box; 
cursor: pointer;
  &:active, &:focus{
    background: white;
    color: black;
  }

`;

window.flag = 0;

class Sidebar extends Component {
  
  state = {
    isSidebar: true,
    isGrid: false,
  };


  handleLogoutClick() {
    localStorage.setItem('auth_user', ' ');

  }
  handleGridClick() {
    this.setState({isGrid: true});
    this.setState({isSidebar: false});
    
  }
  handleGridClose3x3() {
    this.setState({isGrid: false});
    this.setState({isSidebar: true});
    window.dispatchEvent(new CustomEvent('myGlobalVarChanged', { detail: window.flag =1}));
    
  }
  handleGridClose2x2() {
    this.setState({isGrid: false});
    this.setState({isSidebar: true});
    window.dispatchEvent(new CustomEvent('myGlobalVarChanged', { detail: window.flag = 2}));
    
  }
  handleGridClose3x2() {
    this.setState({isGrid: false});
    this.setState({isSidebar: true});
    window.dispatchEvent(new CustomEvent('myGlobalVarChanged', { detail: window.flag = 3}));
    
  }
  // handleGridClick() {
  //   this.setState({ isGrid: true })
  // }

  // componentWillUnmount(){
  //   this.setState({isGrid:false})
  // }

  render() {
    return (
      <div>
      {this.state.isSidebar &&
      <div className="sidebar-container">
        <NavBtn title='Главная' className={'main-h'} to='/main'><MaterialIcon icon="dashboard" size={30} /></NavBtn>
        <NavBtn title='Размер сетки' onClick={this.handleGridClick.bind(this)}><MaterialIcon icon="dashboard_customize" size={30} /></NavBtn>
        <NavBtn title='Источники' className={'source-h'} to='/sources'><MaterialIcon icon="source" size={30} /></NavBtn>
        <NavBtn title='Выйти' onClick={this.handleLogoutClick.bind(this)} to ='/'><MaterialIcon icon="logout" size={30} /> </NavBtn>
      </div>
      }
      {this.state.isGrid &&
          <div className='sidebar-container'>
            <NavBtn title='3x3' onClick={this.handleGridClose3x3.bind(this)} to='/main'><MaterialIcon icon="grid_on" size={30} /></NavBtn>
            <NavBtn title='2x2' onClick={this.handleGridClose2x2.bind(this)} to='/main'><MaterialIcon icon="window" size={30} /></NavBtn>
            <NavBtn title='2x3' onClick={this.handleGridClose3x2.bind(this)} to='/main'><MaterialIcon icon="space_dashboard" size={30} /></NavBtn>
          </div>
      }
      </div>
    );
  }
}

export default Sidebar;