import '../css/App.css';
import React from 'react'
import Sidebar from '../components/Sidebar';
// import halloweenPumpkin from '';

class NotFoundPage extends React.Component {
    render() {
        return (
            <div style={{ position: 'relative', zIndex: 0, backgroundImage: `url(../halloween-pumpkin.gif)` }}>
                <Sidebar />
                <h1 style={{ position: 'relative', zIndex: 15 }}>Запрашиваемая страница не найдена!</h1>
            </div>
        );
    }
}

export default NotFoundPage;