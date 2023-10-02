import React from "react";
import { NavLink } from "react-router-dom";
import { Navbar, Nav, Container } from "react-bootstrap";

function NavBar() {
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

          <NavLink className="nav-link" exact to="/cart">
           Cart
          </NavLink>
        </Nav>
        <Navbar.Collapse className="justify-content-end">
        <Nav>
        <NavLink className="nav-link" to="/user">
            Profile
          </NavLink>
          <NavLink className="nav-link" to="/logout">
            Logout
          </NavLink>
          </Nav>
        </Navbar.Collapse>
      </Container>
      </Navbar>
    
  );
}

export default NavBar;