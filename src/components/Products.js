import React, { Component } from 'react';
import NewProduct from './NewProduct'
import { api } from '../api/init';
import { Button, Table } from 'reactbulma';
import '../App.css';

class Products extends Component {
  constructor(props){
    super(props)
    this.state = {
    	products: [],
	    toggleCreate: false
    }
  }

  toggleCreate = () => {
    this.setState({
      toggleCreate: !this.state.toggleCreate
    })
  }

  handleCreateResponse = (response) => {
    this.setState({
      products: [...this.state.products, response.data],
      toggleCreate: false
    })
  }

  render() {
    return (
    	<div>
	    	<Button onClick={this.toggleCreate}>Create Product</Button>
	      {this.state.toggleCreate && <NewProduct handleCreateResponse={this.handleCreateResponse} />}
	      	<Table striped>
					  <Table.Head>
					    <Table.Tr>
					      <Table.Th>Brand Name</Table.Th>
					      <Table.Th>Name</Table.Th>
					    </Table.Tr>
					  </Table.Head>
					  <Table.Body>
			    	{this.state.products.map((product) => {
			    		return (
					    <Table.Tr key={product._id}>
								<Table.Td>{product.brandName}</Table.Td>
								<Table.Td>{product.name}</Table.Td>
							</Table.Tr>
				      )
			      })
				    }
				    </Table.Body>
			    </Table>
      </div>
    )
  }

  componentDidMount(){
  	api.get('/products')
  		.then((response) => {
  			this.setState({
  				products: response.data
  			})
  		})
  		.catch((error) => {
  			console.log('An error occured retrieving products.', error)
  		})
  }
}

export default Products;
