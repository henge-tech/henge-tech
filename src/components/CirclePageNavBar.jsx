import React from 'react';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';

export default class CirclePageNavBar extends React.Component {
  openPage(e) {
    location.href = e.target.getAttribute('href');
  }

  render() {
    return (
      <Navbar inverse collapseOnSelect fixedTop>
        <Navbar.Header>
          <Navbar.Brand>
            <a href="/">Henge</a>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>
            <NavItem href="/circles/" onClick={this.openPage}>Circles</NavItem>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}
