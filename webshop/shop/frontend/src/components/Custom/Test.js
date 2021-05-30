import React, { Component } from "react";
import axios from "axios";

export default class Test extends Component {
  state = {};

  componentDidMount() {
    axios
      .get("http://localhost:8000/api/auth")
      .then((res) => {
        console.log(res);
        this.setState({ username: res.data });
      })
      .catch((err) => {});
  }
  render() {
    return (
      <div>
        <h1>{this.state.username}</h1>
      </div>
    );
  }
}
