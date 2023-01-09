import React from 'react';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';

export default class CirclePageNavBar extends React.Component {
  openPage(e) {
    location.href = e.target.getAttribute('href');
  }

  render() {
    var creditURL = this.props.credit;
    var openCreditPage = function(e) {
      location.href = creditURL;
    }

    const iconStyle = {
      fill: '#9d9d9d',
      width: '18px',
      height: '18px',
      marginRight: '6px',
    };
    return (
      <Navbar inverse collapseOnSelect fixedTop>
        <Navbar.Header>
        <Navbar.Brand>
        <a href="/">
          <svg role="img" style={iconStyle}>
            <use xmlnsXlink="http://www.w3.org/1999/xlink" xlinkHref="/imgs/svg/sprite.svg#icon"></use>
          </svg>
          Henge</a>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>
            <NavItem href="/floors/" onClick={this.openPage}>Floors</NavItem>
            <NavItem href="/" onClick={this.openPage}>Circles</NavItem>
            <NavItem href="/about/">About</NavItem>
            <NavItem onClick={openCreditPage}>Credits</NavItem>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}
