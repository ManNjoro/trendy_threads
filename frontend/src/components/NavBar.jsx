import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";
import { TiThMenu } from "react-icons/ti";
import { AiOutlineClose } from "react-icons/ai";
import { fakeLogOut } from "../logout";

const isAuthenticated = localStorage.getItem("isAuthenticated")
class NavBar extends Component {
  constructor() {
    super();
    this.state = {
      isMenuOpen: false,
    };
  }

  toggleMenu = () => {
    this.setState((prevState) => ({
      isMenuOpen: !prevState.isMenuOpen,
    }));
  };

  handleResize = () => {
    if (window.innerWidth < 750) {
      this.setState({ isMenuOpen: false }); // Close the menu on resize for small screens
    } else {
      this.setState({ isMenuOpen: false }); // Set the menu to closed state for large screens
    }
  };

  componentDidMount() {
    window.addEventListener("resize", this.handleResize);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.handleResize);
  }

  render() {
    const { isMenuOpen } = this.state;

    return (
      <div className="nav-container">
        {window.innerWidth < 750 ? (
          <>
            <div className="nav-header">
              <Link className="logo" to="/"></Link>
              {isMenuOpen ? (
                <AiOutlineClose className="menubar" onClick={this.toggleMenu} />
              ) : (
                <TiThMenu className="menubar" onClick={this.toggleMenu} />
              )}
            </div>
            <div className={`nav-sidebar ${isMenuOpen ? "open" : ""}`}>
              <div className="nav-links">
                <NavLink to="/">Home</NavLink>
                <NavLink to="/products">Products</NavLink>
                <NavLink to="/cart">Cart</NavLink>
                <NavLink to="/login">Login</NavLink>
                <NavLink to="/signup">SignUp</NavLink>
                <NavLink to="/logout">Logout</NavLink>
              </div>
            </div>
          </>
        ) : (
          <>
            <Link className="logo" to="/"></Link>
            <div className="nav-links">
              <NavLink to="/">Home</NavLink>
              <NavLink to="/products">Products</NavLink>
              <NavLink to="/cart">Cart</NavLink>
              {!isAuthenticated ? <>
              <NavLink to="/login">Login</NavLink>
              <NavLink to="/signup">SignUp</NavLink></>
              :
              <button className="logout" onClick={fakeLogOut}>Logout</button>
            }
            </div>
          </>
        )}
      </div>
    );
  }
}

export default NavBar;
