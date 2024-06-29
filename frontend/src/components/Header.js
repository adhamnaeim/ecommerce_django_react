import React from 'react'
import { Navbar, Nav, Container, Row, NavDropdown } from 'react-bootstrap'
import { LinkContainer, } from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../actions/userActions'

function Header() {

  const userLogin = useSelector(state => state.userLogin)
  const {userInfo} = userLogin
  const dispatch = useDispatch()
  const logoutHandler = () => {
    dispatch(logout())
  }
  return (
    <header>
        <Navbar expand="lg" className="light" variant='dark'>
        <Container>
            <LinkContainer to='/'>
              <Navbar.Brand >E-commerce</Navbar.Brand>
            </LinkContainer>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
                <LinkContainer to='/cart'><Nav.Link><i className='fas fa-shopping-cart'> Cart</i></Nav.Link></LinkContainer>
                {userInfo ? (
                  <NavDropdown title={userInfo.name ? userInfo.name : userInfo.username} id='username'>
                    <LinkContainer to='/profile'>
                      <NavDropdown.Item>Profile</NavDropdown.Item>
                    </LinkContainer>
                    <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
                  </NavDropdown>
                ): (
                  
                  <LinkContainer to='/login'><Nav.Link><i className='fas fa-user'> Login</i></Nav.Link></LinkContainer>
                )}
            </Nav>
            </Navbar.Collapse>
        </Container>
        </Navbar>
    </header>
  )
}

export default Header
