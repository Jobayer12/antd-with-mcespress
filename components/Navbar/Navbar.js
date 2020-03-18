import React, { Component } from "react";
import "./Navbar.less";
import { Drawer, Button, Icon } from "antd";

class Navbar extends Component {
  state = {
    visible: false
  };

  showDrawer = () => {
    this.setState({
      visible: true
    });
  };

  onClose = () => {
    this.setState({
      visible: false
    });
  };

  render() {
    return (
      <div>
        <section className="navigation">
          <div className="nav-container">
            <div className="brand">
              <a href="/">Logo</a>
            </div>
            <nav>
              <div className="nav-mobile">
                <a id="nav-toggle" href="#!">
                  <span></span>
                </a>
              </div>
              <ul className="nav-list">
                <li>
                  <a href="/user/profile">Profile</a>
                </li>
                <li>
                  <a href="/user/signin">Signin</a>
                </li>
                <li>
                  <a href="/user/signup">Signup</a>
                </li>
                <li>
                  <a href="#!">Signout</a>
                </li>
              </ul>
            </nav>
          </div>
        </section>
      </div>
    );
  }
}

export default Navbar;
