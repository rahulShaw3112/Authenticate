import React from "react";
import { Container, Row, Form, Button, Col } from "react-bootstrap";
import { Link, Redirect } from "react-router-dom";

import { signup as signupservice } from '../services/auth';
import AuthContext from '../context/AuthContext';
import Loading from "./Loading";
import Error from "./Error";

class SignUp extends React.Component {
  static contextType = AuthContext;
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      email: "",
      password: "",
      error: ""
    }
  }

  handleSubmit = (event) => {
    event.preventDefault();
    signupservice({ ...this.state }, this.handleResponse);
  }

  handleResponse = ({ data }) => {
    if (data.success) {
      this.context.setIsLoggedIn(true);
      this.setState({ ...this.state, error: "" })
    } else {
      this.setState({ ...this.state, error: data.msg })
    }
  }

  handleChange = (e) => {
    this.setState({ ...this.state, [e.target.name]: e.target.value} )
  }

  render = () => {
    if(this.state == null) {
      return null;
    }
    if(this.context && this.context.isLoggedIn == null) {
      return (
        <Loading />
      )
    }
    if(this.context && this.context.isLoggedIn) {
      return (
        <Redirect to="/home" />
      );
    }
    return (
      <Container>
        <Row className="justify-content-center align-items-center">
          <Col xs={12} sm={6} md={6} lg={6} className="login-form  align-items-center">
            <div>
              <Form className="login-card" onSubmit={this.handleSubmit} id="form">
                <Error error={this.state.error}/>
                <h1>Sign Up</h1>
                <Form.Group controlId="formBasicName">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Name"
                    name="name"
                    onChange={this.handleChange}
                    value={this.state.name}
                  />
                </Form.Group>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    name="email"
                    onChange={this.handleChange}
                    value={this.state.email}
                  />
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    name="password"
                    onChange={this.handleChange}
                    value={this.state.password}
                  />
                </Form.Group>
                <Button variant="primary" type="submit">
                  Submit
                </Button>
                <Form.Text className="text-muted">
                  or <Link to="/login">login</Link> if you already have an account.
                </Form.Text>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default SignUp;
