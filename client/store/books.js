import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_BOOKS = 'GET_BOOKS'
const GET_AUTHOR = 'GET_AUTHOR'
const SORTED = 'SORTED'

/**
 * INITIAL STATE
 */
const initialState = {
  originalBookList: [],
  bookList: []
}

/**
 * ACTION CREATORS
 */
export const getBooks = books => {
  return {type: GET_BOOKS, books}
}
export const getAuthor = books => {
  return {type: GET_AUTHOR, books}
}
export const sortedBooks = books => {
  return {type: SORTED, books}
}

/**
 * THUNK CREATORS
 */
export const getBookList = searchTerms => async dispatch => {
  try {
    if (searchTerms.author) {
      const resAuthor = await axios.get(
        `http://openlibrary.org/search.json?author=${searchTerms.author}`
      )
      if (searchTerms.title) {
        const resTitle = await axios.get(
          `http://openlibrary.org/search.json?title=${searchTerms.title}`
        )
        // resAuthor.data.docs.forEach((book, i) => {
        //   resArray.push(book)
        //   resArray.push(resTitle.data.docs[i])
        // })

        const resArray = resTitle.data.docs.concat(resAuthor.data.docs)
        dispatch(getBooks(resArray))
      } else {
        dispatch(getBooks(resAuthor.data.docs))
      }
    } else {
      const resTitle = await axios.get(
        `http://openlibrary.org/search.json?title=${searchTerms.title}`
      )
      dispatch(getBooks(resTitle.data.docs))
    }
  } catch (error) {
    console.log(error)
  }
}

export const getWithAuthor = author => async dispatch => {
  const res = await axios.get(
    `http://openlibrary.org/search.json?author=${author}`
  )
  dispatch(getAuthor(res.data.docs))
}

export const sortedBookList = books => async dispatch => {
  dispatch(sortedBooks(books))
}

/**
 * REDUCER
 */
const bookReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_BOOKS:
      return {...state, originalBookList: action.books, bookList: action.books}
    case GET_AUTHOR:
      return {...state, bookList: action.books}
    case SORTED:
      return {...state, bookList: action.books}
    default:
      return state
  }
}

export default bookReducer
