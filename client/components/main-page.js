import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {Container, Header, Icon, Button} from 'semantic-ui-react'
import SearchModal from './search-modal'

class MainPage extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <Container text>
        <Header
          as="h1"
          content="My Library"
          inverted
          style={{
            fontSize: '4em',
            fontWeight: 'normal',
            marginBottom: 0,
            marginTop: '3em'
          }}
        />
        <Header
          as="h2"
          content="Find any book in the world."
          inverted
          style={{
            fontSize: '1.7em',
            fontWeight: 'normal',
            marginTop: '1.5em'
          }}
        />
        {/* <Button primary size="huge">
          Choose For Me
        </Button>
        <Button primary size="huge">
          Find A Book
          <Icon name="right arrow" />
        </Button> */}
        <SearchModal name="Find a Book">
          {/* <Icon name="right arrow" /> */}
        </SearchModal>
        {/* <SearchModal name="Choose For Me" /> */}
      </Container>
    )
  }
}

export default MainPage
