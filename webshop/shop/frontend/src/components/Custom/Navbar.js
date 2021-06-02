import React, { Component } from "react";
import axios from "axios";
import styled from "styled-components";

import cartIcon from "../../shopping-cart.png";
import logoutIcon from "../../logout.png";

const Main = styled.div`
  color: "white";
  background-color: #f79862;
  overflow: hidden;
`;

const Link = styled.a`
  float: left;
  color: #f2f2f2;
  text-align: center;
  padding: 14px 12px;
  text-decoration: none;
  font-size: 17px;
  transition: 0.5s;
  &:hover {
    background-color: white;
    color: black;
  }
`;

const CartLink = styled.a`
  float: left;
  color: #f2f2f2;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
  font-size: 17px;
  transition: 0.5s;
  &:hover {
    background-color: #ddd;
    color: black;
  }
  @media (min-width: 769px) {
    display: none;
  }
`;

export default class Navbar extends Component {
  render() {
    return (
      <Main>
        <Link href="">Browse</Link>
        <Link href="">My items</Link>
        <Link href="">Account</Link>

        <Link
          style={{ float: "right" }}
          href="http://localhost:8000/account/logout"
        >
          <img src={logoutIcon} alt="Logout" style={{ width: "25px" }} />
        </Link>
        <CartLink style={{ float: "right" }} href="">
          <img src={cartIcon} alt="Cart" style={{ width: "25px" }} />
        </CartLink>
      </Main>
    );
  }
}
