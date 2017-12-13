import React, { Component } from 'react';
import LoginForm from './components/LoginForm';
import Products from './components/Products';
import RegisterForm from './components/RegisterForm';
import { setJwt } from './api/init';
import { Button } from 'reactbulma';
import './App.css';

class App extends Component {
  state = {
    loggedIn: null,
    register: false
  }

  handleLogOut = () => {
    this.setState({
      loggedIn: null
    })
    localStorage.removeItem('token')
  }

  toggleRegister = () => {
    this.setState({
      register: !this.state.register
    })
  }

  handleLoginResponse = (response) => {
    this.setState({
      loggedIn: response.data.token,
      register: false
    })
  }

  render() {

    let loggedInState = null
    if (!this.state.loggedIn && !this.state.register) {
      loggedInState = <div>
                        <LoginForm handleLoginResponse={this.handleLoginResponse} />
                        <Button onClick={this.toggleRegister}>Register</Button>
                      </div>
    } else if (this.state.register) {
      loggedInState = <div>
                        <RegisterForm handleLoginResponse={this.handleLoginResponse} />
                        <Button onClick={this.toggleRegister}>Log In</Button>
                      </div>
    } else {
      loggedInState = <div>
                        <Products token={this.state.loggedIn}/>
                        <Button onClick={this.handleLogOut}>Log Out</Button>
                      </div>
    }

    return (
      <div className="App">
        {loggedInState}        
      </div>
    );
  }

  componentDidMount() {
    let token = localStorage.getItem('token')
    token && setJwt(token) 
    this.setState({
      loggedIn: token
    })
  }
}

export default App;
