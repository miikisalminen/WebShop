import React, { Component } from "react";
import styled from "styled-components";
import axios from "axios";
import Modal from "react-bootstrap/Modal";

axios.defaults.xsrfHeaderName = "X-CSRFToken";
axios.defaults.withCredentials = true

const Button = styled.a`
  color: black;
  text-align: center;
  padding: 0px 12px;
  text-decoration: none;
  font-size: 17px;
  transition: 0.5s;
  width: 100%;
  border: 1px solid black;
  margin-bottom: 10px;
  margin-left: 5px;
  box-sizing: border-box;

  &:hover {
    border: 1px solid #f79862;
    color: #f79862;
    cursor: pointer;
    text-decoration: none;
  }
`;

const Input = styled.input`
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  box-sizing: border-box;
`;

export default class CreateListing extends Component {
  constructor(props) {
    super(props);

    this.state = {
      show: false,
      title: "",
      desc: "",
      price: 0,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleClose = () => {
    this.setState({ show: false });
  };
  handleShow = () => {
    this.setState({ show: true });
  };

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit() {

    let data = {
      title: this.state.title,
      desc: this.state.desc,
      price: this.state.price
    };

    axios
      .post("api/query", data ,{
      xsrfHeaderName: 'X-CSRFToken',
      withCredentials: true

      }
        
      )
      .then((res) => {
        console.log(res.data)
      })
      .catch((err) => {
        console.log(err)
      });
    this.handleClose();
  }

  render() {
    return (
      <>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/css/bootstrap.min.css"
          integrity="sha384-B0vP5xmATw1+K9KRQjQERJvTumQW0nPEzvF6L/Z6nronJ3oUOFUFpCjEUQouq2+l"
          crossorigin="anonymous"
        />
        <Button onClick={this.handleShow}>Create a listing</Button>
        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>New listing</Modal.Title>
          </Modal.Header>

          <form onSubmit={this.handleSubmit}>
            <Modal.Body>
              <label>Title: </label>
              <Input
                name="title"
                type="text"
                onChange={this.handleChange}
                placeholder="ex. Old sock"
              />
              <br />
              <label>Description: </label>
              <Input
                type="text"
                name="desc"
                onChange={this.handleChange}
                placeholder="Describe the product in a few words."
              />
              <br />
              <label>Price (€): </label>
              <Input
                type="number"
                name="price"
                onChange={this.handleChange}
                placeholder="ex. 19€"
              />
              <br />
            </Modal.Body>
            <Modal.Footer>
              <Button variant="primary" onClick={this.handleSubmit}>
                Publish
              </Button>
            </Modal.Footer>
          </form>
        </Modal>
      </>
    );
  }
}
