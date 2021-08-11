import React from "react";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";

import { NavLink, useHistory } from "react-router-dom";

// import { UserStoreContext } from "../context/UserContext";

import { useSelector, useDispatch } from "react-redux";
import { updateProfile } from "../redux/actions/authAction";

const NavBar = () => {
  const history = useHistory();
  // const [profile, setProfile] = React.useState(null)
  // const userStore = React.useContext(UserStoreContext);

  const profileRedux = useSelector((state) => state.authReducer.profile);
  const total = useSelector((state) => state.cartReducer.total);

  const dispatch = useDispatch();

  // const getProfile = () => {
  //     const profileValue = JSON.parse(localStorage.getItem('profile'))
  //     if (profileValue) {
  //       setProfile(profileValue)
  //     }
  // }

  // React.useEffect(() => {
  //   console.log('use effect navbar')
  //   getProfile()
  // }, [])

  const getProfile = () => {
    const profileValue = JSON.parse(localStorage.getItem("profile"));
    if (profileValue) {
      // userStore.updateProfile(profileValue);
      dispatch(updateProfile(profileValue));
    }
  };

  React.useEffect(() => {
    // console.log("use effect navbar");
    getProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("profile");
    history.replace("/");
    // history.go(0);
    // userStore.updateProfile(null);
    dispatch(updateProfile(null));
  };

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
            <NavLink
              className="nav-link"
              to="/cart"
              exact
              activeClassName="active"
            >
              Cart {total} item
            </NavLink>

            <NavDropdown title="Workshop" id="basic-nav-dropdown">
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
              <NavDropdown.Item
                onClick={() => {
                  history.replace("/upload");
                }}
              >
                Upload
              </NavDropdown.Item>
              <NavDropdown.Item
                onClick={() => {
                  history.replace("/member");
                }}
              >
                Menu Member
              </NavDropdown.Item>
              <NavDropdown.Item
                onClick={() => {
                  history.replace("/chart");
                }}
              >
                Chart Report
              </NavDropdown.Item>
            </NavDropdown>
            {/* <NavLink
              className="nav-link"
              to="/upload"
              exact
              activeClassName="active"
            >
              Upload
            </NavLink>
            <NavLink
              className="nav-link"
              to="/member"
              exact
              activeClassName="active"
            >
              Member
            </NavLink> */}
          </Nav>
          {/* {userStore.profile ? (
            <span className="navbar-text text-white">
              Welcome {userStore.profile.name} role: {userStore.profile.role}
              <button className="btn btn-danger ml-2" onClick={logout}>
                Logout
              </button>
            </span>
          ) : (
            <>
              <Nav>
                <NavLink
                  className="nav-link"
                  to="/register"
                  exact
                  activeClassName="active"
                >
                  Register
                </NavLink>
                <NavLink
                  className="nav-link"
                  to="/login"
                  exact
                  activeClassName="active"
                >
                  Login
                </NavLink>
              </Nav>
            </>
          )} */}

          {profileRedux ? (
            <span className="navbar-text text-white">
              Welcome {profileRedux.name} role: {profileRedux.role}
              <button className="btn btn-danger ml-2" onClick={logout}>
                Logout
              </button>
            </span>
          ) : (
            <>
              <Nav>
                <NavLink
                  className="nav-link"
                  to="/register"
                  exact
                  activeClassName="active"
                >
                  Register
                </NavLink>
                <NavLink
                  className="nav-link"
                  to="/login"
                  exact
                  activeClassName="active"
                >
                  Login
                </NavLink>
              </Nav>
            </>
          )}
        </Navbar.Collapse>
      </Navbar>
    </>
  );
};

export default NavBar;
