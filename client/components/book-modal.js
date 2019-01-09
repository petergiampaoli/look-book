import React from 'react'
import {Button, Header, Image, Modal} from 'semantic-ui-react'

const BookModal = () => (
  <Modal trigger={<Button>More Info</Button>}>
    <Modal.Header>Book Title</Modal.Header>
    <Modal.Content image>
      <Image wrapped size="medium" src="/images/avatar/large/rachel.png" />
      <Modal.Description>
        <Header>BOOK COVER IMAGE</Header>
        <p>Author</p>
        <p>Other information about the book</p>
      </Modal.Description>
    </Modal.Content>
  </Modal>
)

export default BookModal
