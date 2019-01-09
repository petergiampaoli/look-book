import React, {Component} from 'react'
import axios from 'axios'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {Card, Icon, Image, Button} from 'semantic-ui-react'

export default class SingleBookCard extends Component {
  constructor(props) {
    super(props)
  }
  componentDidMount() {}
  render() {
    const {title, author, amazonId, coverImg} = this.props
    const imageUrl = `https://covers.openlibrary.org/b/id/${coverImg}-M.jpg`
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
            <Card.Header>{title}</Card.Header>
            <Card.Meta>{author}</Card.Meta>
          </Card.Content>
          {/* <Button>ADD TO LIST</Button> */}
          <Button
            href={`https://www.amazon.com/gp/product/ ${amazonId}`}
            icon="barcode"
            content="Buy on Amazon"
          />
        </Card>
      </div>
    )
  }
}
