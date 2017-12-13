import React, { Component } from 'react';
import { api, setJwt } from '../api/init';
import { Control, Title, Level, Button, Input} from 'reactbulma';
import '../App.css';

class LoginForm extends Component {
  constructor(props){
    super(props)
    this.state = {
      emailValue: '',
      passwordValue: ''
    }
  }

  handleLoginChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleLoginSubmit = (event) => {
    event.preventDefault();
      api.post('/auth', {
        email: this.state.emailValue,
        password: this.state.passwordValue
      })
      .then((response) => {
        setJwt(response.data.token)
        this.props.handleLoginResponse(response)
      })
      .catch((error) => {
        console.log('An error occured when trying to login.', error)
      })
  }

  render() {
    return (
      <Level>
        <Control>
          <Title>Log In</Title>
          <form onSubmit={this.handleLoginSubmit}>
            <Input type="text" 
              placeholder="Email" 
              name="emailValue" 
              onChange={this.handleLoginChange}
              value={this.state.emailValue} />
            <Input type="password" 
              placeholder="Password" 
              name="passwordValue" 
              onChange={this.handleLoginChange}
              value={this.state.passwordValue} />
            <Button>Log In</Button>
          </form>
        </Control>
      </Level>
    )
  }
}

export default LoginForm;
