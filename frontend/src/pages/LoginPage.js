import '../css/App.css';
import '../css/Input.css';
import { Navigate } from "react-router-dom";
import React, { Component } from 'react';
import Input from "../components/Input";
import Button from "../components/Button";

// async function ClickHandler(){
//   let response = await fetch('http://localhost/DashboardWeb/yii2-basic/web/user/login/?login=admin&password=admin');
//   let commit = await response.json();
//   console.log(commit);
// };

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      logged: false,
      referrer: "/",
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
    console.log(JSON.stringify(userData));
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
        if (result === 'ALL GOOD') {
          //alert('You are logged in.');
          this.setState({logged: true})
          this.setState({referrer: '/sources'});
        } else if(result === 'Incorrect login') {
          alert('Incorrect login');
        } else if (result === 'Incorrect password'){
          alert('Incorrect password')
        }
      });
  }

  render() {
    return (
      <div className='login'>
        { this.state.logged &&(<Navigate to={this.state.referrer} replace={true}/>)}
        <form className='login-form' onSubmit={this.handleFormSubmit}>
          <label className='login-label'>LOG IN</label>
          <div className='login-container'>
          <Input
            type={"text"}
            name={"login"}
            value={this.state.newUser.name}
            placeholder={"Enter your login"}
            onChange={this.handleInput}
          />{" "}
          <Input
            type={"password"}
            name={"password"}
            value={this.state.newUser.name}
            placeholder={"Enter your password"}
            onChange={this.handleInput}
          />{" "}
          <Button
            action={this.handleFormSubmit}
            type={"primary"}
            title={"Login"}
          />{" "}
          </div>
        </form>
      </div>
    );
  }
}


export default LoginPage;
