import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {Button, Header, Image, Modal, Icon, Form} from 'semantic-ui-react'
import {getBookList} from '../store/books'

class SearchModal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false,
      author: '',
      title: ''
    }
    this.handleClick = this.handleClick.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.inputReference = this.inputReference.bind(this)
    this.show = this.show.bind(this)
    this.close = this.close.bind(this)
  }

  show = dimmer => () => this.setState({dimmer, open: true})

  close = () => this.setState({open: false})

  inputReference = () => React.createRef()

  handleClick = () => {
    this.setState({open: false})
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit(event) {
    event.preventDefault()
    const author = this.state.author.split(' ').join('+')
    const title = this.state.title.split(' ').join('+')
    this.props.getBookList({author, title})
    this.setState({open: false})
    location.pathname = '/book'
  }

  handleItemClick = (event, {name}) => this.setState({activeItem: name})

  render() {
    const {open, dimmer} = this.state

    return (
      <div>
        <Button primary size="huge" onClick={this.show('blurring')}>
          {this.props.name}
          <Icon name="right arrow" />
        </Button>

        <Modal inverted="true" dimmer={dimmer} open={open} onClose={this.close}>
          <Modal.Header inverted="true">Select a Photo</Modal.Header>
          <Modal.Content image>
            <Image wrapped size="medium" src="images/avatar/large/rachel.png" />
            <Modal.Description>
              <Header>Default Image</Header>
              <Form ref={this.inputReference} onSubmit={this.handleSubmit}>
                <Form.Group widths="equal">
                  <Form.Input
                    focus
                    fluid
                    name="author"
                    label="Search By Author"
                    placeholder="William Gibson"
                    value={this.state.author}
                    onChange={this.handleChange}
                  />
                  <Form.Input
                    fluid
                    focus
                    name="title"
                    label="Search By Title"
                    placeholder="Neuromancer"
                    value={this.state.title}
                    onChange={this.handleChange}
                  />
                </Form.Group>
                <Button type="button" color="black" onClick={this.close}>
                  Back
                </Button>
                <Link to="/book">
                  <Button
                    type="submit"
                    to="/book"
                    color="green"
                    onClick={this.handleSubmit}
                  >
                    Search
                    <Icon name="right arrow" />
                  </Button>
                </Link>
              </Form>
              <p>
                The Search is Optimized to find books by Author and / or Title
              </p>
              <p>If you want additional search options you can click here !</p>
            </Modal.Description>
          </Modal.Content>
          <Modal.Actions>
            {/* <Button color="black" onClick={this.close}>
              Back
            </Button>
            <Button type="submit" color="green" onClick={this.handleSubmit}>
              Search
              <Icon name="right arrow" />
            </Button> */}
          </Modal.Actions>
        </Modal>
      </div>
    )
  }
}

const mapStateToProps = ({bookList}) => ({bookList})

const mapDispatchToProps = {getBookList}

export default connect(mapStateToProps, mapDispatchToProps)(SearchModal)
