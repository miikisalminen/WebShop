import React, { Component } from "react";
import axios from "axios";
import styled from "styled-components";
import Modal from "react-bootstrap/Modal";

const Main = styled.div`
  color: "white";
  border: 3px solid black;
  width: 50% auto;
  transition: 0.5s;

  &:hover {
    box-shadow: 5px 5px;
  }
`;

const Input = styled.input`
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  box-sizing: border-box;
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

const Button = styled.a`
  float: right;
  color: black;
  text-align: center;
  padding: 14px 14px;
  text-decoration: none;
  font-size: 17px;

  transition: 0.2s;
  &:hover {
    color: #f79862;
  }
`;

export default class OwnedListingCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      show: false,
      new_title: "",
      new_desc: "",
      new_price: 0,
    };
  }

  handleClose = () => {
    this.setState({ show: false });
  };
  handleShow = () => {
    this.setState({ show: true });
  };

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleDelete = () => {
    let data = {
      title: this.props.title,
    };

    axios
      .post("api/delete", data, {
        xsrfHeaderName: "X-CSRFToken",
        withCredentials: true,
      })
      .then((res) => {})
      .catch((err) => {
        console.log(err);
      });

    window.location.reload();
  };

  handleEdit = () => {
    let data = {
      title: this.props.title,
      desc: this.props.desc,
      price: this.props.price,

      new_title: this.state.new_title,
      new_desc: this.state.new_desc,
      new_price: this.state.new_price,
    };

    axios
      .post("api/edit", data, {
        xsrfHeaderName: "X-CSRFToken",
        withCredentials: true,
      })
      .then((res) => {})
      .catch((err) => {
        console.log(err);
      });

    this.props.title = this.state.new_title;
    this.props.desc = this.state.new_desc;
    this.props.price = this.state.new_price;

    window.location.reload();
  };

  render() {
    return (
      <Main>
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Libre+Franklin:wght@300&display=swap"
          rel="stylesheet"
        />
        <Title>{this.props.title}</Title>
        <Button style={{ color: "red" }} onClick={this.handleDelete}>
          Delete
        </Button>
        <Button onClick={this.handleShow}>Edit</Button>
        <Description>{this.props.desc}</Description>
        <Timestamp>{this.props.created_at}</Timestamp>
        <Price>{this.props.price}€</Price>

        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Edit listing</Modal.Title>
          </Modal.Header>

          <form onSubmit={this.handleEdit}>
            <Modal.Body>
              <label>Title: </label>
              <Input
                name="new_title"
                type="text"
                onChange={this.handleChange}
                placeholder={this.props.title}
              />
              <br />
              <label>Description: </label>
              <Input
                type="text"
                name="new_desc"
                onChange={this.handleChange}
                placeholder={this.props.desc}
              />
              <br />
              <label>Price (€): </label>
              <Input
                type="number"
                name="new_price"
                onChange={this.handleChange}
                placeholder={this.props.price + "€"}
              />
              <br />
            </Modal.Body>
            <Modal.Footer>
              <Button variant="primary" onClick={this.handleEdit}>
                Publish
              </Button>
            </Modal.Footer>
          </form>
        </Modal>
      </Main>
    );
  }
}
