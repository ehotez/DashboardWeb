import '../css/App.css';
import React from 'react'
import { NavBtn } from '../components/Sidebar';
import '../css/App.css'

class NotFoundPage extends React.Component {
    render() {
        return (
            <div style={{ height: '100%', width: '100%', backgroundColor: 'white', position: 'absolute', zIndex: 10 }}>
                <div className='center'>
                    404 PAGE NOT FOUND
                </div>
                <NavBtn className='center'style={{marginLeft:'-80px', top:'43%'}} to='/'>
                    На главную
                </NavBtn>
            </div>
        );
    }
}

export default NotFoundPage;