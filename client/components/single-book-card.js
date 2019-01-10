import React, {Component} from 'react'
import axios from 'axios'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {Card, Icon, Image, Button} from 'semantic-ui-react'
import BookModal from './book-modal'
import {getWithAuthor} from '../store/books'

class SingleBookCard extends Component {
  constructor(props) {
    super(props)
  }
  componentDidMount() {}
  authorClick(author) {
    console.log(author)
    this.props.getWithAuthor(author)
  }
  render() {
    const {title, author, amazonId, coverImg, isbn} = this.props
    const imageUrl = `https://covers.openlibrary.org/b/id/${coverImg}-L.jpg`
    return (
      <div>
        <Card raised color="red">
          <Card.Content>
            <Image
              style={{margin: '4px'}}
              bordered
              rounded
              size="tiny"
              src={imageUrl}
            />
            <Card.Header>Title: {title}</Card.Header>
            <Card.Meta onClick={this.authorClick}>Author: {author}</Card.Meta>
          </Card.Content>
          {/* <Button>ADD TO LIST</Button> */}
          <BookModal imageUrl={imageUrl} {...this.props} />
          {amazonId ? (
            <Button
              href={`https://www.amazon.com/gp/product/${amazonId[0]}`}
              icon="barcode"
              content="Buy on Amazon"
            />
          ) : (
            <Button icon="barcode">Unavailable to Purchase</Button>
          )}
        </Card>
      </div>
    )
  }
}

const mapDispatchToProps = {getWithAuthor}

export default connect(null, mapDispatchToProps)(SingleBookCard)
