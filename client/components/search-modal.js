import React, {Component} from 'react'
import {Link, withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import {Button, Header, Image, Modal, Icon, Form} from 'semantic-ui-react'
import {getBookList} from '../store/books'
// import rocketBook from './../../public/rocket-book.png'

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
  handleValidate = () =>
    this.state.author ? true : this.state.title ? true : false

  handleClick = () => {
    this.setState({open: false})
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit = async event => {
    event.preventDefault()
    if (this.handleValidate()) {
      const author = this.state.author.split(' ').join('+')
      const title = this.state.title.split(' ').join('+')
      await this.props.getBookList({author, title})
      this.setState({open: false})
      this.props.history.push('/book')
    } else {
      alert('You forgot to put in your search terms')
    }
  }

  handleItemClick = (event, {name}) => this.setState({activeItem: name})

  render() {
    const {open, dimmer} = this.state
    const bookImage =
      'http://iconutopia.com/wp-content/uploads/2016/06/rocket-book.png'

    return (
      <div>
        <Button primary size="huge" onClick={this.show('blurring')}>
          {this.props.name}
          <Icon name="right arrow" />
        </Button>

        <Modal
          closeIcon
          inverted="true"
          dimmer={dimmer}
          open={open}
          onClose={this.close}
        >
          <Modal.Header inverted="true">Search for a Book</Modal.Header>
          <Modal.Content image>
            <Image
              style={{
                width: null,
                height: 200
              }}
              size="small"
              src={bookImage}
            />
            <Modal.Description>
              <Header>Simple Search</Header>
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
                <Button
                  type="submit"
                  to="/book"
                  color="green"
                  onClick={this.handleSubmit}
                >
                  Search
                  <Icon name="right arrow" />
                </Button>
              </Form>
              <br />
              <p>
                The Search is Optimized to find books by Author and / or Title
              </p>
            </Modal.Description>
          </Modal.Content>
        </Modal>
      </div>
    )
  }
}

const mapStateToProps = ({books}) => ({books})

const mapDispatchToProps = {getBookList}

const connector = connect(mapStateToProps, mapDispatchToProps)(SearchModal)

export default withRouter(connector)
