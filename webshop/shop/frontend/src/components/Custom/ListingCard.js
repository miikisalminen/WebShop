import React, { Component } from "react";
import axios from "axios";
import styled from "styled-components";

import cartIcon from "../../shopping-cart.png";
import logoutIcon from "../../logout.png";

const Main = styled.div`
  color: "white";
  border: 3px solid black;
  width: 50% auto;
  transition: 0.5s;

  &:hover {
    box-shadow: 5px 5px;
  }
`;

const Title = styled.h2`
  padding-left: 10px;
`;

const Price = styled.h3`
  padding-left: 10px;
`;

const Description = styled.p`
  padding-left: 10px;
`;

const BuyButton = styled.a`
  float: right;
  color: black;
  text-align: center;
  padding: 14px 32px;
  text-decoration: none;
  font-size: 17px;

  transition: 0.2s;
  &:hover {
    color: #f79862;
  }
`;

export default class ListingCard extends Component {
  render() {
    return (
      <Main>
        <Title>{this.props.title}</Title>
        <BuyButton href="">Add to Cart</BuyButton>
        <Description>{this.props.desc}</Description>
        <Price>{this.props.price}€</Price>
      </Main>
    );
  }
}
