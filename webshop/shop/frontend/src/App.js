import styled from "styled-components";
import React, { Component } from "react";
import axios from "axios";

import Navbar from "./components/Custom/Navbar";
import Searchbar from "./components/Custom/Searchbar";
import ListingCard from "./components/Custom/ListingCard";
import Paginator from "./components/Custom/Paginator";

import ColumnContainer from "./components/Containers/ColumnContainer";
import CartContainer from "./components/Containers/CartContainer";

import searchIcon from "./search.png";

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

const Inputfield = styled.input`
  display: block;
  width: 100%;
  padding: 12px 0px 12px 40px;
  margin: 5px;
  box-sizing: border-box;

  font-size: 16px;
  border: 3px solid black;

  background-image: url(${searchIcon});
  background-repeat: no-repeat;
  background-position: 10px 8px;
`;

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      listings: [],
      page: 1,
      searchTerm: "",
    };

    this.loadNext = this.loadNext.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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
    axios
      .get(
        "/api/query?page=" +
          this.state.page +
          "&searchTerm=" +
          this.state.searchTerm,
        {}
      )
      .then(
        (response) => {
          this.setState({ listings: response.data });
        },
        (error) => {
          console.log(error);
        }
      );
    window.scrollTo(0, 0);
  };

  handleChange(event) {
    this.setState({ searchTerm: event.target.value });
  }

  handleSubmit(event) {
    this.setState({ page: 1 });
    axios.get("/api/query?page=1&searchTerm=" + this.state.searchTerm, {}).then(
      (response) => {
        console.log(response.data);
        this.setState({ listings: response.data });
      },
      (error) => {
        console.log(error);
      }
    );
    event.preventDefault();
  }

  render() {
    const listingList = [];
    this.state.listings.forEach((listing) => {
      listingList.push(
        <ListingCard
          title={listing.title}
          price={listing.price}
          desc={listing.desc}
          created_at={listing.created_at}
        />
      );
    });
    return (
      <div>
        <Navbar className="navbar" />
        <div className="App" style={{ display: "flex" }}>
          <ColumnContainer style={{ width: "70em" }}>
            <form style={{ width: "100%" }} onSubmit={this.handleSubmit}>
              <Inputfield
                type="text"
                name="search"
                value={this.state.searchTerm}
                onChange={this.handleChange}
                placeholder="Search listings"
                maxLength="20"
              />
            </form>
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
