import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {Grid, Menu, Button, Dropdown} from 'semantic-ui-react'
import SingleBookCard from './single-book-card'
import {getBookList, sortedBookList} from '../store/books'
import BookModal from './book-modal'

class AllBooks extends Component {
  constructor(props) {
    super(props)
    this.state = {
      filter: '',
      sort: ''
    }
    this.dropDownChange = this.dropDownChange.bind(this)
    this.dropDownFilter = this.dropDownFilter.bind(this)
    this.sortOnName = this.sortOnName.bind(this)
    this.filterOnName = this.filterOnName.bind(this)
  }
  componentDidMount() {
    this.props.getBookList()
  }
  //SORTING FUNCTION
  sortOnName = property => {
    return function(a, b) {
      if (a[property] < b[property]) {
        return -1
      } else if (a[property] > b[property]) {
        return 1
      } else {
        return 0
      }
    }
  }

  filterOnName = property => {
    return function(a, b) {
      if (a[property] < b[property]) {
        return -1
      } else if (a[property] > b[property]) {
        return 1
      } else {
        return 0
      }
    }
  }

  dropDownChange = (event, {name}) => {
    const {bookList} = this.props.books
    if (name.name === 'relevance') {
      this.props.sortedBookList(this.props.books.originalBookList)
    } else {
      const sorted = bookList.sort(this.sortOnName(name.name))
      this.props.sortedBookList(sorted)
    }
  }
  dropDownFilter = () => {
    const {bookList} = this.props.books

    const filtered = bookList.filter(books => books.id_amazon)
    this.props.sortedBookList(filtered)
  }

  render() {
    const {bookList} = this.props.books
    const filter = [{text: 'Available On Amazon'}]
    const sort = [
      {text: 'Title A-Z', name: 'title'},
      {text: 'Published Date', name: 'first_publish_year'}
    ]
    return (
      <div>
        <Menu inverted>
          <Menu.Item>
            <Dropdown
              text="Filter"
              icon="filter"
              floating
              labeled
              button
              className="icon"
            >
              <Dropdown.Menu>
                <Dropdown.Header icon="edit" content="Filter by" />
                <Dropdown.Divider />
                {filter.map((item, i) => (
                  <Dropdown.Item
                    key={i}
                    text={item.text}
                    value="filter"
                    name={item}
                    onClick={this.dropDownFilter}
                  />
                ))}
              </Dropdown.Menu>
            </Dropdown>
            <Dropdown
              text="Sort"
              icon="book"
              floating
              labeled
              button
              className="icon"
            >
              <Dropdown.Menu>
                <Dropdown.Header icon="edit" content="Sort by" />
                <Dropdown.Divider />
                {sort.map((item, i) => (
                  <Dropdown.Item
                    key={i}
                    text={item.text}
                    value="filter"
                    name={item}
                    onClick={this.dropDownChange}
                  />
                ))}
              </Dropdown.Menu>
            </Dropdown>
          </Menu.Item>
        </Menu>
        <Grid celled="internally" columns={3}>
          <Grid.Row equal="true">
            {bookList.length ? (
              bookList.map((book, i) => (
                <Grid.Column key={i} width={4}>
                  <SingleBookCard
                    key={i}
                    streched
                    title={book.title}
                    author={book.author_name}
                    amazonId={book.id_amazon}
                    coverImg={book.cover_i}
                    isbn={book.isbn}
                    authorkey={book.author_name}
                    places={book.place}
                    tags={book.subject}
                    year={book.first_publish_year}
                  />
                </Grid.Column>
              ))
            ) : (
              <Link to="/home">
                <Button>No Books Match that Query Try Again</Button>
              </Link>
            )}
          </Grid.Row>
        </Grid>
      </div>
    )
  }
}

const mapStateToProps = ({books}) => ({books})

const mapDispatchToProps = {getBookList, sortedBookList}

export default connect(mapStateToProps, mapDispatchToProps)(AllBooks)
