import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {Button, Header, Image, Modal, Label} from 'semantic-ui-react'
import {getWithAuthor} from '../store/books'
import {connect} from 'react-redux'

class BookModal extends Component {
  constructor(props) {
    super(props)
    this.state = {open: false}

    this.authorClick = this.authorClick.bind(this)
    this.show = this.show.bind(this)
    this.close = this.close.bind(this)
  }
  show = dimmer => () => this.setState({dimmer, open: true})

  close = () => this.setState({open: false})

  authorClick = author => {
    this.props.getWithAuthor(author.join(''))
    this.close()
  }
  render() {
    const {
      imageUrl,
      title,
      author,
      isbn,
      tags,
      year,
      places,
      authorkey
    } = this.props

    const isbnNums = isbn ? isbn[0] : 'No ISBN Number'
    const {open, dimmer} = this.state
    return (
      <Modal
        trigger={<Button onClick={this.show('blurring')}>More Info</Button>}
        closeIcon
        dimmer={dimmer}
        open={open}
        onClose={this.close}
      >
        <Modal.Header>
          {title} by: {author}
        </Modal.Header>
        <Modal.Content image>
          <Image wrapped size="large" src={imageUrl} />
          <Modal.Description>
            <Header>
              Click the author name to get all books by that author
            </Header>

            <Button onClick={() => this.authorClick(authorkey)}>
              {author}
            </Button>

            <p> ISBN: {isbnNums}</p>
            <p> Setting: </p>
            {places
              ? places.map(place => <Label>{place} </Label>)
              : 'Setting Unknown'}
            <p>
              Tags:{' '}
              {tags
                ? tags.map(tag => <Label>{tag}</Label>)
                : 'No Associated Genres'}
            </p>
            <p>First Publihed: {year}</p>
          </Modal.Description>
        </Modal.Content>
      </Modal>
    )
  }
}

const mapDispatchToProps = {getWithAuthor}

export default connect(null, mapDispatchToProps)(BookModal)
