import React from "react";
import { Container, Row, Form, Button, Col } from "react-bootstrap";
import "../css/login.css";
import { Link, Redirect } from "react-router-dom";
import Error from "./Error";

import { login as loginservice } from "../services/auth";
import AuthContext from "../context/AuthContext";
import Loading from "./Loading";

class Login extends React.Component {
  static contextType = AuthContext;

  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      error: "",
    };
  }

  handleSubmit = (event) => {
    event.preventDefault();
    loginservice({ ...this.state }, this.handleResponse);
  };

  handleResponse = ({ data }) => {
    if (data.success) {
      this.context.setIsLoggedIn(true);
      this.setState({ ...this.state, error: "" });
    } else {
      this.setState({ ...this.state, error: data.msg });
    }
  };

  handleChange = (e) => {
    this.setState({ ...this.state, [e.target.name]: e.target.value });
  };

  render = () => {
    if (this.state == null) {
      return null;
    }
    if (this.context && this.context.isLoggedIn == null) {
      return <Loading />;
    }
    if (this.context && this.context.isLoggedIn) {
      return <Redirect to="/home" />;
    }
    return (
      <Container>
        <Row className="justify-content-center align-items-center">
          <Col
            xs={12}
            sm={6}
            md={6}
            lg={6}
            className="login-form  align-items-center"
          >
            <div>
              <Form className="login-card" onSubmit={this.handleSubmit}>
                <Error error={this.state.error} />
                <h1>Login</h1>
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
                  or <Link to="/signup">Create an account</Link> if you don't
                  have one.
                </Form.Text>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
    );
  };
}

export default Login;
