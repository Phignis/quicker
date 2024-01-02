import React from "react";
import { Navbar, Container, Nav, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import classes from './Navbar.module.css';

function Navbarr() {
  return (
    <header className={classes.header}>
      <Navbar sticky="top">
        <Container fluid>
          <Nav className="ms-center">
            <Row className="justify-content-center align-items-center">
              <Col xs="auto"> 
                <Link className={`nav-link ${classes.navtitles}`} to="/shop">Shop</Link>
              </Col>
              <Col xs="auto"> 
                <Link className={`nav-link ${classes.navtitles}`} to="/courses">Shopping List</Link>
              </Col>
            </Row>
          </Nav>
        </Container>
      </Navbar>
    </header>
  );
}

export default Navbarr;
