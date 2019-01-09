import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link, NavLink} from 'react-router-dom'
import {logout} from '../store'
import {Menu, Container} from 'semantic-ui-react'

class Navbar extends Component {
  constructor() {
    super()
    this.state = {activeItem: 'home'}
  }
  handleItemClick = (e, {name}) => this.setState({activeItem: name})

  render() {
    const {activeItem} = this.state
    return (
      <Container style={{padding: '10px'}}>
        <Menu inverted>
          <NavLink to="/home">
            <Menu.Item
              name="home"
              active={activeItem === 'home'}
              onClick={this.handleItemClick}
            />
          </NavLink>
          <NavLink to="/book">
            <Menu.Item
              name="My Books"
              active={activeItem === 'My Books'}
              onClick={this.handleItemClick}
            />
          </NavLink>
          <NavLink to="/search">
            <Menu.Item
              name="Search"
              active={activeItem === 'Search'}
              onClick={this.handleItemClick}
            />
          </NavLink>
        </Menu>
      </Container>
    )
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(null, mapDispatch)(Navbar)
