import React, { Component } from 'react';
import { api } from '../api/init';
import { Control, Title, Level, Button, Input} from 'reactbulma';
import '../App.css';

class NewProduct extends Component {
  constructor(props){
    super(props)
    this.state = {
      brandNameValue: '',
      nameValue: ''
    }
  }

  handleLoginChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleCreateSubmit = (event) => {
    event.preventDefault();
      api.post('/products', {
        brandName: this.state.brandNameValue,
        name: this.state.nameValue
      })
      .then((response) => {
        this.props.handleCreateResponse(response)
      })
      .catch((error) => {
        console.log('An error occured when trying to login.', error)
      })
  }

  render() {
    return (
      <Level>
        <Control>
          <Title>Create a Product</Title>
          <form onSubmit={this.handleCreateSubmit}>
            <Input type="text" 
              placeholder="Brand Name" 
              name="brandNameValue" 
              onChange={this.handleLoginChange}
              value={this.state.brandNameValue} />
            <Input type="text" 
              placeholder="Name" 
              name="nameValue" 
              onChange={this.handleLoginChange}
              value={this.state.nameValue} />
            <Button>Create!</Button>
          </form>
        </Control>
      </Level>
    )
  }
}

export default NewProduct;
