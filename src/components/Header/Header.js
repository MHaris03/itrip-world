import React, { useContext, useEffect, useState } from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import { Link, NavLink, useHistory } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import { AuthContext } from "../../store/auth-context";

import logo from "../../images/itrip-world.png";
import classes from "./Header.module.css";

const Header = () => {
  const { user, logout } = useContext(AuthContext);
  const history = useHistory();
  const [userName, setUserName] = useState(null);

  useEffect(() => {
    if (!user?.email) return;
    setUserName(user.email.split("@")[0]);
  }, [user]);

  return (
    <header className={classes.header}>
      <Navbar expand="lg" className={classes.navbar}>
        <Container>
          {/* Logo */}
          <Navbar.Brand as={Link} to="/" className={classes.logoContainer}>
            <img src={logo} alt="I Trip World" />
            <span>I Trip World</span>
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className={`ms-auto ${classes.navLinks}`}>
              <Nav.Link as={NavLink} exact to="/" activeClassName={classes.active}>
                Home
              </Nav.Link>
              <Nav.Link as={HashLink} smooth to="/contactus#" activeClassName={classes.active}>
                Contact Us
              </Nav.Link>

              {user?.email ? (
                <>
                  <Nav.Link as={HashLink} smooth to="/my-orders#" activeClassName={classes.active}>
                    My Orders
                  </Nav.Link>

                  {user.email === "itripworld@gmail.com" && (
                    <>
                      <Nav.Link as={HashLink} smooth to="/manage-all-orders#" activeClassName={classes.active}>
                        Manage Orders
                      </Nav.Link>
                      <Nav.Link as={HashLink} smooth to="/add-new-service#" activeClassName={classes.active}>
                        Add Tour
                      </Nav.Link>
                    </>
                  )}

                  <button className={classes.userBtn} onClick={logout}>
                    {userName} Logout
                  </button>
                  <img
                    src="https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI="
                    alt="user"
                    className={classes.userImg}
                  />
                </>
              ) : (
                <button className={classes.userBtn} onClick={() => history.push("/login")}>
                  Login
                </button>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
