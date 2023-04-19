import '../css/App.css';
import React from 'react'
import { NavBtn } from '../components/Sidebar';

class NotFoundPage extends React.Component {
    render() {
        return (
            <div style={{ height: '100%', width: '100%', backgroundColor: 'white', position: 'absolute', zIndex: 10 }}>
                <text style={{ left: '36%', top: '35%', font: 'message-box', fontSize: '2.5em', position: 'absolute' }}>
                    404 PAGE NOT FOUND
                </text>
                <NavBtn style={{ position: 'absolute', left: '39%', top: '40%', width: '20vw', color: 'darkblue' }} to='/'>
                    На главную
                </NavBtn>
            </div>
        );
    }
}

export default NotFoundPage;