import React, { Component, createRef } from 'react';
import '../css/Grid.css';

var intervalId = 0

class Query extends Component {
    constructor(props) {
        super(props);
        this.query = createRef();
        intervalId = 0;
        this.fetchData = this.fetchData.bind(this);
        this.time = Number(this.props.time)
        this.link = this.props.link
        this.name = this.props.name
        this.widget = this.props.widget
        this.value = Number(localStorage.getItem(localStorage.getItem("auth_user") + "-" + this.widget + 'q'))
    }

    fetchData() {
        fetch(this.link)
            .then((response) => response.json())
            .then((data) => {
                this.query.current.textContent = data.value
                localStorage.setItem(localStorage.getItem("auth_user") + "-" + this.widget + 'q', data.value);
            })
            .catch((error) => {
                console.error('Ошибка при получении данных:', error);
            });
    }

    componentDidMount() {
        console.log(this.name)
        // Запуск функции fetchData с интервалом 10 секунд
        if (this.time === 0) {
            intervalId = setInterval(this.fetchData, 10 * 1000);
        } else {
            intervalId = setInterval(this.fetchData, this.time * 1000);
        }
    }

    componentWillUnmount() {
        // Очистка интервала перед размонтированием компонента
        clearInterval(intervalId);
    }

    render() {
        return (
            <div>
                <div className='viewname'>
                    {this.name}
                </div>
                <div className='view' ref={this.query}>
                    {this.value}
                </div>
            </div>
        );
    }
}
export default Query;                         
