import React from 'react';
import '../css/Sidebar.css';
import { NavLink as Link } from 'react-router-dom';
import {CiLogout} from 'react-icons/ci';
import {RiDashboardFill, RiDashboardLine} from 'react-icons/ri';
import {MdSource, MdGridOn, MdOutlineSpaceDashboard, MdOutlineSource} from 'react-icons/md';
import {BsGrid, BsGridFill} from 'react-icons/bs';
import {RxGrid} from 'react-icons/rx';
import {AiOutlineClose} from 'react-icons/ai';
import styled from 'styled-components';
import $ from 'jquery';
export const NavBtn = styled(Link)`
font-size: 30px;
text-align: center;
text-decoration: none;
color:black;
position: relative;
height:80px;
width:100%;
border: none;
background: transparent;
line-height: 90px; 
box-sizing: border-box; 
cursor: pointer;
  &:active, &:focus{
    background: white;
    color: black;
  }

`;

window.flag = 0;

class Sidebar extends React.Component {

  state = {
    isSidebar: true,
  };

  handleLogoutClick() {
    localStorage.setItem('auth_user', '');
  }

  handleGridClick() {
    $(".grid-popup").css('display', 'flex');
    $(".grid-size").css('background', 'white');  
  }

  handleGridClose3x3() {
    this.setState({ isSidebar: true });
    $(".grid-popup").css('display', 'none');
    $(".grid-size").css('background', 'none');
    window.dispatchEvent(new CustomEvent('myGlobalVarChanged', { detail: window.flag = 1 }));
  }

  handleGridClose2x2() {
    this.setState({ isSidebar: true });
    $(".grid-popup").css('display', 'none');
    $(".grid-size").css('background', 'none');
    window.dispatchEvent(new CustomEvent('myGlobalVarChanged', { detail: window.flag = 2 }));
  }

  handleGridClose3x2() {
    this.setState({ isSidebar: true });
    $(".grid-popup").css('display', 'none');
    $(".grid-size").css('background', 'none');
    window.dispatchEvent(new CustomEvent('myGlobalVarChanged', { detail: window.flag = 3 }));
  }

  handleGridClose() {
    $(".grid-size").css('background', 'none');
    $(".grid-popup").css('display', 'none');
  }

  render() {
    return (
      <div>
        <div className="sidebar-container">
          <NavBtn title='Главная' className={'main-h'} to='/'><RiDashboardFill className='main-active'/> <RiDashboardLine className='main-not-active'/></NavBtn>
          <NavBtn title='Источники' className={'source-h'} to='/sources'><MdSource className='source-active'/><MdOutlineSource className='source-not-active' /> </NavBtn>
          <NavBtn title='Размер сетки' className={'grid-size'} onClick={this.handleGridClick.bind(this)}><BsGridFill className='grid-active'/> <BsGrid className='grid-not-active' /></NavBtn>
          <NavBtn title='Выйти' style={{ position: 'sticky', top: '90%'}} onClick={this.handleLogoutClick.bind(this)} to='/login'><CiLogout/> </NavBtn>
        </div>
        <div className='grid-popup'>
          <NavBtn title='3x3' onClick={this.handleGridClose3x3.bind(this)} to='/'><MdGridOn/></NavBtn>
          <NavBtn title='2x2' onClick={this.handleGridClose2x2.bind(this)} to='/'><RxGrid /></NavBtn>
          <NavBtn title='2x3' onClick={this.handleGridClose3x2.bind(this)} to='/'><MdOutlineSpaceDashboard/></NavBtn>
          <NavBtn title='Закрыть'
            style={{
              background: 'rgb(190, 190, 190)',
              borderTopRightRadius: '17px',
              borderBottomRightRadius: '17px'
            }}
            onClick={this.handleGridClose.bind(this)}><AiOutlineClose/></NavBtn>
        </div>
      </div>
    );
  }
}

export default Sidebar;