import React, { Component } from "react";
import Navbar from "./Navbar/Navbar";
export default class Layout extends Component {
  render() {
    return (
      <div>
        <Navbar />
        {this.props.children}
      </div>
    );
  }
}
