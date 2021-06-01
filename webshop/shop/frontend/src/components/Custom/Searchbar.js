import React, { Component } from "react";
import axios from "axios";
import styled from "styled-components";

import searchIcon from "../../search.png";

const Main = styled.div`
  color: "white";
  background-color: white;

  width: 100%;
  margin-bottom: 10px;
`;

const Inputfield = styled.input`
  display: block;
  width: 100%;
  padding: 12px 0px 12px 40px;
  margin: auto;
  box-sizing: border-box;

  font-size: 16px;
  border: 3px solid black;

  background-image: url(${searchIcon});
  background-repeat: no-repeat;
  background-position: 10px 8px;
`;

export default class Searchbar extends Component {
  render() {
    return (
      <Main>
        <form style={{ width: "100%" }}>
          <Inputfield
            type="text"
            name="search"
            placeholder="Search listings"
            maxLength="20"
          />
        </form>
      </Main>
    );
  }
}
