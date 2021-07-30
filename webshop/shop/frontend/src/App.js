import styled from "styled-components";
import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import axios from "axios";

import Navbar from "./components/Custom/Navbar";
import Searchbar from "./components/Custom/Searchbar";
import ListingCard from "./components/Custom/ListingCard";
import OwnedListingCard from "./components/Custom/OwnedListingCard";
import Paginator from "./components/Custom/Paginator";

import ColumnContainer from "./components/Containers/ColumnContainer";
import CartContainer from "./components/Containers/CartContainer";

import searchIcon from "./search.png";
import CreateListing from "./components/Custom/CreateListing";

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  grid-gap: 15px;
  margin-left: 10px;
  @media (max-width: 900px) {
    box-sizing: border-box;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr;
    .cartContainer {
      display: none;
    }
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
      myListings: [],
      myCart: [],
      page: 1,
      searchTerm: "",
      username: "",
    };

    this.loadNext = this.loadNext.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    // Fetch initial listings
    axios.get("/api/query?page=" + this.state.page, {}).then(
      (response) => {
        this.setState({ listings: response.data });
      },
      (error) => {
        console.log(error);
      }
    );

    this.setState({ page: 2 });

    // Fetch users username
    axios.get("/api/auth", {}).then(
      (response) => {
        this.setState({ username: response.data });
      },
      (error) => {
        console.log(error);
      }
    );
    // Fetch user made listings
    axios.get("/api/auth/myitems", {}).then(
      (response) => {
        this.setState({ myListings: response.data });
      },
      (error) => {
        console.log(error);
      }
    );
    // Fetch user cart
    axios.get("/api/cart", {}).then(
      (response) => {
        console.log(response.data);
        this.setState({ myCart: response.data });
      },
      (error) => {
        console.log(error);
      }
    );
  }

  loadNext(event) {
    this.setState({ page: this.state.page + 1 });
    //this.setState({ page: this.state.page });
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
  }

  handleChange(event) {
    this.setState({ searchTerm: event.target.value });
  }

  removeFromCart = () => {
    console.log("removed");
  };

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
          username={this.state.username}
        />
      );
    });

    const mylistingsList = [];
    this.state.myListings.forEach((listing) => {
      mylistingsList.push(
        <OwnedListingCard
          title={listing.title}
          price={listing.price}
          desc={listing.desc}
          created_at={listing.created_at}
          username={this.state.username}
        />
      );
    });

    const cartList = [];
    this.state.myCart.forEach((listing) => {
      cartList.push(
        <div style={{ padding: "5px" }}>
          <h3 style={{ float: "left", padding: "10px" }}>{listing.title}</h3>
          <p style={{ float: "right", padding: "10px" }}>{listing.price}€</p>
          <button style={{ width: "100%" }} onClick={this.removeFromCart}>
            Remove
          </button>
        </div>
      );
    });
    return (
      <div>
        <Navbar className="navbar" username={this.state.username} />

        <div className="App" style={{ display: "flex" }}>
          <ColumnContainer style={{ width: "70em" }}>
            <Router basename="/shop">
              <Switch>
                <Route exact path="/">
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
                  <PaginatorButton onClick={this.loadNext}>
                    Load more
                  </PaginatorButton>
                </Route>

                <Route path="/myitems">
                  <h2 style={{ textAlign: "center" }}>Active</h2>
                  <CreateListing />
                  <Grid>{mylistingsList}</Grid>
                </Route>
              </Switch>
            </Router>
          </ColumnContainer>

          <CartContainer
            className="cartContainer"
            style={{ width: "30em", padding: "5px" }}
          >
            <h1 style={{ textAlign: "center" }}>Cart</h1>
            {cartList}
            <br />
            <button style={{ width: "100%" }}>Buy</button>
          </CartContainer>
        </div>
      </div>
    );
  }
}
