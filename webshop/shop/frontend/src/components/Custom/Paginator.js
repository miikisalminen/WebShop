import React, { Component } from "react";
import axios from "axios";
import styled from "styled-components";

const Main = styled.div`
  color: "white";
  background-color: white;

  width: 50%auto;
  margin: auto;
`;

const Button = styled.a`
  color: black;
  text-align: center;
  padding: 0px 12px;
  text-decoration: none;
  font-size: 17px;
  transition: 0.5s;
  &:hover {
    background-color: black;
    color: white;
  }
`;

export default class Paginator extends Component {
  render() {
    return (
      <Main>
        <Button href="">Previous</Button>
        <Button href="">Next</Button>
      </Main>
    );
  }
}
