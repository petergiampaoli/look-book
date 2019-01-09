import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {Grid} from 'semantic-ui-react'
import SingleBookCard from './single-book-card'
import {getBookList} from '../store/books'
import BookModal from './book-modal'

class AllBooks extends Component {
  constructor(props) {
    super(props)
  }
  componentDidMount() {
    this.props.getBookList()
  }

  render() {
    const {bookList} = this.props.books
    return (
      <div>
        <div>LOOK AT ALL THE BOOKS WE HAVE HERE</div>
        <Grid celled="internally" columns={3}>
          <Grid.Row equal="true">
            {bookList.map(book => (
              <Grid.Column width={4}>
                <SingleBookCard
                  streched
                  title={book.title}
                  author={book.author_name}
                  amazonId={book.id_amazon}
                  coverImg={book.cover_i}
                />
              </Grid.Column>
            ))}
          </Grid.Row>
        </Grid>
        <BookModal />
      </div>
    )
  }
}

const mapStateToProps = ({books}) => ({books})

const mapDispatchToProps = {getBookList}

export default connect(mapStateToProps, mapDispatchToProps)(AllBooks)
