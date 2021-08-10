import React from "react";
import {
  Navbar,
  Nav,
  NavDropdown,
  Form,
  FormControl,
  Button,
} from "react-bootstrap";

import { NavLink, useHistory } from "react-router-dom";

const NavBar = () => {
  const history = useHistory();

  return (
    <>
      <Navbar bg="dark" expand="lg" variant="dark">
        <NavLink className="navbar-brand" to="/" exact>
          <img
            src="./logo192.png"
            width="30"
            height="30"
            className="d-inline-block align-top"
            alt="Dobby logo"
          />{" "}
          DOBBY
        </NavLink>
        {/* <Navbar.Brand href="/">
          <img
            src="./logo192.png"
            width="30"
            height="30"
            className="d-inline-block align-top"
            alt="Dobby logo"
          />{" "}
          DOBBY
        </Navbar.Brand> */}
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="mr-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <NavLink className="nav-link" to="/" exact activeClassName="active">
              Home
            </NavLink>
            <NavLink
              className="nav-link"
              to="/product"
              exact
              activeClassName="active"
            >
              Product
            </NavLink>
            <NavLink
              className="nav-link"
              to="/about"
              exact
              activeClassName="active"
            >
              About
            </NavLink>

            <NavDropdown
              title="Workshop (Pagination + CRUD)"
              id="basic-nav-dropdown"
            >
              <NavDropdown.Item
                onClick={() => {
                  history.replace("/hospital");
                }}
              >
                Data Hospital
              </NavDropdown.Item>
              <NavDropdown.Item
                onClick={() => {
                  history.replace("/category");
                }}
              >
                News (CRUD)
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Form className="d-flex">
            <FormControl
              type="search"
              placeholder="Search"
              className="mr-2"
              aria-label="Search"
            />
            <Button variant="outline-success">Search</Button>
          </Form>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
};

export default NavBar;
