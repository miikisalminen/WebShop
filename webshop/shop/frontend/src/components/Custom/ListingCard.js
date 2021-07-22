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
  font-family: "Libre Franklin", sans-serif;
  font-size: 20px;
  font-weight: bold;
  line-height: normal;
  padding-left: 10px;
  margin-block-start: 0.83em;
  margin-block-end: 0.83em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
`;

const Price = styled.h3`
  padding-left: 10px;
  display: block;
  font-size: 1.17em;
  margin-block-start: 1em;
  margin-block-end: 1em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
  font-weight: bold;
`;

const Description = styled.p`
  padding-left: 10px;
`;

const Timestamp = styled.p`
  padding-left: 10px;
  color: gray;
  font-style: italic;
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
    if (this.props.username != "Guest") {
      return (
        <Main>
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=Libre+Franklin:wght@300&display=swap"
            rel="stylesheet"
          />
          <Title>{this.props.title}</Title>
          <BuyButton href="">Add to Cart</BuyButton>
          <Description>{this.props.desc}</Description>
          <Timestamp>{this.props.created_at}</Timestamp>
          <Price>{this.props.price}€</Price>
        </Main>
      );
    } else {
      return (
        <Main>
          <Title>{this.props.title}</Title>
          <Description>{this.props.desc}</Description>
          <Timestamp>{this.props.created_at}</Timestamp>
          <Price>{this.props.price}€</Price>
        </Main>
      );
    }
  }
}
