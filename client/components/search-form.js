import React, {Component} from 'react'
import {Form} from 'semantic-ui-react'

class SearchBook extends Component {
  constructor() {
    super()
    this.state = {
      author: '',
      title: ''
    }
  }

  handleChange = (e, {value}) => this.setState({value})

  render() {
    return (
      <Form>
        <Form.Group widths="equal">
          <Form.Input focus fluid label="Search By Author" placeholder="WHO?" />
          <Form.Input
            fluid
            focus
            label="Search By Title"
            placeholder="Catcher in the Rye"
          />
        </Form.Group>

        <Form.Button>Search</Form.Button>
      </Form>
    )
  }
}

export default SearchBook
