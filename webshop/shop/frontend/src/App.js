import styled from "styled-components";
import React, { Component } from "react";
import axios from "axios";

import Navbar from "./components/Custom/Navbar";
import Searchbar from "./components/Custom/Searchbar";
import ListingCard from "./components/Custom/ListingCard";
import Paginator from "./components/Custom/Paginator";

import ColumnContainer from "./components/Containers/ColumnContainer";
import CartContainer from "./components/Containers/CartContainer";

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  grid-gap: 15px;
  margin-left: 10px;
  @media (max-width: 769px) {
    margin: 5px;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr;
  }
`;

const PaginatorButton = styled.a`
  color: black;
  text-align: center;
  padding: 0px 12px;
  text-decoration: none;
  font-size: 17px;
  transition: 0.5s;
  width: 100%;
  &:hover {
    color: #f79862;
    cursor: pointer;
  }
`;

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      listings: [],
      page: 1,
    };

    this.loadNext = this.loadNext.bind(this);
  }

  componentDidMount() {
    axios.get("/api/query?page=" + this.state.page, {}).then(
      (response) => {
        this.setState({ listings: response.data });
      },
      (error) => {
        console.log(error);
      }
    );
  }

  loadNext = () => {
    this.state.page = this.state.page + 1;
    this.setState({ page: this.state.page });
    axios.get("/api/query?page=" + this.state.page, {}).then(
      (response) => {
        this.setState({ listings: response.data });
      },
      (error) => {
        console.log(error);
      }
    );
    window.scrollTo(0, 0);
  };

  render() {
    const listingList = [];
    this.state.listings.forEach((listing) => {
      listingList.push(
        <ListingCard
          title={listing.title}
          price={listing.price}
          desc={listing.desc}
        />
      );
    });
    return (
      <div>
        <Navbar className="navbar" />
        <div className="App" style={{ display: "flex" }}>
          <ColumnContainer style={{ width: "70em" }}>
            <Searchbar />
            <Grid>{listingList}</Grid>
            <PaginatorButton onClick={this.loadNext}>Next</PaginatorButton>
          </ColumnContainer>

          <CartContainer style={{ width: "30em" }}>
            <h1 style={{ textAlign: "center" }}>
              Cart:
              <br></br>
              Stinky sock
              <br></br>
              Old matress
              <br></br>
              Damp water
            </h1>
          </CartContainer>
        </div>
      </div>
    );
  }
}
