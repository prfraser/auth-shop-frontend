import React, { Component } from 'react';
import { api, setJwt } from '../api/init';
import { Control, Title, Level, Button, Input} from 'reactbulma';
import '../App.css';

class RegisterForm extends Component {
  constructor(props){
    super(props)
    this.state = {
      firstNameValue: '',
      lastNameValue: '',
      emailValue: '',
      passwordValue: '',
      confirmPasswordValue: ''
    }
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleRegisterSubmit = (event) => {
    event.preventDefault();
    if (this.state.passwordValue === this.state.confirmPasswordValue){
      api.post('/auth/register', {
        firstName: this.state.firstNameValue,
        lastName: this.state.lastNameValuet,
        email: this.state.emailValue,
        password: this.state.passwordValue,
      })
      .then((response) => {
        setJwt(response.data.token)
        this.props.handleLoginResponse(response)
      })
      .catch((error) => {
        console.log('An error occured when trying to register.', error)
      })
    } else {
      alert('Your password fields do not match.')
    }
  }

  render() {
    return (
      <Level>
        <Control>
          <Title>Register</Title>
          <form onSubmit={this.handleRegisterSubmit}>
            <Input type="text" 
              name="firstNameValue" 
              placeholder="First Name" 
              value={this.state.firstNameValue}
              onChange={this.handleChange}/>
            <Input type="text" 
              name="lastNameValue" 
              placeholder="Last Name"  
              value={this.state.lastNameValue}
              onChange={this.handleChange}/>
            <Input type="text" 
              name="emailValue" 
              placeholder="Email"  
              value={this.state.emailValue}
              onChange={this.handleChange}/>
            <Input type="password" 
              name="passwordValue" 
              placeholder="Password" 
              value={this.state.passwordValue}
              onChange={this.handleChange}/>
            <Input type="password" 
              name="confirmPasswordValue" 
              placeholder="Confirm Password" 
              value={this.state.confirmPasswordValue}
              onChange={this.handleChange}/>
            <Button>Register</Button>
          </form>
        </Control>
      </Level>
    )
  }
};

export default RegisterForm;
