import React, { useContext } from 'react';
import { NavLink, useNavigate } from "react-router-dom";
import { Navbar, Nav, Container } from "react-bootstrap";
import {userData} from './App';

function NavBar({setUser, cart}) {
const nav = useNavigate();
const user = useContext(userData);

let sum = null

  const logout = () => {
    fetch("/logout", {method: "GET"}
    )
    .then((r) => {
      if (r.ok) {
        setUser(null) 
        nav("/")
      }
    });
  }

  if (!user) {
  return ( 
  <Navbar  data-bs-theme="dark">
  <Container fluid>
    <Nav>
      <NavLink className="nav-link" exact= 'true' to="/">
        Home
      </NavLink>
    </Nav>
    <Navbar.Collapse className="justify-content-end">
    <Nav>
    <NavLink className="nav-link" to="/login">
        Login
      </NavLink>
      </Nav>
    </Navbar.Collapse>
  </Container>
  </Navbar>
   
  );  }

  // sum of quantity in cart
  if (cart){
    for (const object of cart){sum+= object.quantity}
  } 

  return (
    <Navbar  data-bs-theme="dark">
      <Container fluid>
        <Nav>
          <NavLink className="nav-link" exact to="/">
            Home
          </NavLink>

          <NavLink className="nav-link" exact to="/books">
            Books
          </NavLink>

          <NavLink className="nav-link" exact to="/cart" >
           {sum ? `Cart [${sum}]`: 'Cart'}
          </NavLink>
        </Nav>
        <Navbar.Collapse className="justify-content-end">
        <Nav>
        <NavLink className="nav-link" to="/user">
            {user.full_name}
          </NavLink>
          <NavLink className="nav-link" onClick={logout} >
            Logout
          </NavLink>
          </Nav>
        </Navbar.Collapse>
      </Container>
      </Navbar>
    
  );
}

export default NavBar;