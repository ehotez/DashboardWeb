import '../css/App.css';
import '../css/Login.css';
import { Navigate } from "react-router-dom";
import React, { Component } from 'react';
import Input from "../components/Input";

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      logged: false,
      newUser: {
        login: "",
        password: ""
      }
    };
    this.handleLogin = this.handleLogin.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleInput = this.handleInput.bind(this);
  }

  handleInput(e) {
    let value = e.target.value;
    let name = e.target.name;
    this.setState(
      prevState => ({
        newUser: {
          ...prevState.newUser,
          [name]: value
        }
      }),
    );
  }

  componentDidMount() {
    if (localStorage.getItem('auth_user')) {
      this.setState({ logged: true });
    }
  }

  handleLogin(e) {
    let value = e.target.value;
    this.setState(
      prevState => ({
        newUser: {
          ...prevState.newUser,
          name: value
        }
      }),
    );
  }

  handlePassword(e) {
    let value = e.target.value;
    this.setState(
      prevState => ({
        newUser: {
          ...prevState.newUser,
          name: value
        }
      }),
    );
  }

  handleFormSubmit(e) {
    e.preventDefault();
    let userData = this.state.newUser;
    // console.log(JSON.stringify(userData));
    //Обратити ВНИМАНИЕ на ковычки ` `
    fetch(`http://localhost/DashboardWeb/yii2-basic/web/user/login/?login=${userData.login}&password=${userData.password}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
      .then((response) => response.json())
      .then((result) => {
        if (result === 'Incorrect login') {
          alert('Incorrect login');
        } else if (result === 'Incorrect password') {
          alert('Incorrect password')
        } else {
          this.setState({ logged: true });
          localStorage.setItem('auth_user', result);
          // console.log(localStorage.getItem('auth_user'));
        }
      });
  }

  render() {
    return (
      <div className='login'>
        {this.state.logged && (<Navigate to='/' replace={true} />)}
        <form className='login-form' onSubmit={this.handleFormSubmit}>
          <label className='login-label'>ВХОД</label>
          <div className='login-container'>
            <Input
              type={"text"}
              name={"login"}
              placeholder={"Введите логин"}
              onChange={this.handleInput}
            />{" "}
            <Input
              type={"password"}
              name={"password"}
              placeholder={"Введите пароль"}
              onChange={this.handleInput}
            />{" "}
            <button onClick={this.handleFormSubmit} title='Войти' className='submit-button'>Войти</button>
          </div>
        </form>
      </div>
    );
  }
}


export default LoginPage;
