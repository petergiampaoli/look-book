import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_BOOKS = 'GET_BOOKS'

/**
 * INITIAL STATE
 */
const initialState = {
  bookList: [
    {title: 'The Hobbit', author_name: ['J. R. R. Tolkien'], cover_i: 8291598},
    {
      title: 'The Two Towers',
      author_name: ['J. R. R. Tolkien'],
      cover_i: 8167232
    },
    {
      title: 'The Fellowship of the Ring',
      author_name: ['J. R. R. Tolkien'],
      cover_i: 8221252
    },
    {
      title: 'The Return of the King',
      author_name: ['J. R. R. Tolkien'],
      cover_i: 8302846
    },
    {
      title: 'The Lord of the Rings',
      author_name: ['J. R. R. Tolkien'],
      cover_i: 8314541
    },
    {
      title: 'The Complete History of Middle-Earth',
      author_name: ['J. R. R. Tolkien'],
      cover_i: 10802
    },
    {
      title: 'The History of Middle-earth',
      author_name: ['J. R. R. Tolkien'],
      cover_i: 10086
    },
    {
      title: 'The Complete History of Middle-Earth (Boxed Set)',
      author_name: ['J. R. R. Tolkien'],
      cover_i: undefined
    },
    {
      title: 'The War of the Jewels',
      author_name: ['J. R. R. Tolkien'],
      cover_i: undefined
    },
    {
      title: 'Tolkien, J. R. R. - Pinturas y Dibujos',
      author_name: ['J. R. R. Tolkien'],
      cover_i: undefined
    },
    {
      title: 'La Guerra de Las Joyas',
      author_name: ['J. R. R. Tolkien'],
      cover_i: undefined
    }
  ]
}

/**
 * ACTION CREATORS
 */
export const getBooks = books => {
  return {type: GET_BOOKS, books}
}

/**
 * THUNK CREATORS
 */
export const getBookList = searchTerms => async dispatch => {
  console.log('INSIDE THE THUNK ONE OEN ', searchTerms)
  if (searchTerms.author) {
    const res = await axios.get(
      `http://openlibrary.org/search.json?author=${searchTerms.author}`
    )
  } else if (searchTerms.title) {
    const res = await axios.get(
      `http://openlibrary.org/search.json?title=${searchTerms.title}`
    )
  }
  // const res = await axios.get(
  //   // 'http://openlibrary.org/search.json?author=tolkien'
  //   'http://openlibrary.org/search.json?q=gibson'
  // )
  console.log('INSIDE THE THUNK TWO TWO ', res.data.docs)
  const bookArray = res.data.docs.map(book =>
    (({title, author_name, cover_i}) => ({title, author_name, cover_i}))(book)
  )
  dispatch(getBooks(bookArray))
}

/**
 * REDUCER
 */
const bookReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_BOOKS:
      return {...state, bookList: action.books}
    default:
      return state
  }
}

export default bookReducer
