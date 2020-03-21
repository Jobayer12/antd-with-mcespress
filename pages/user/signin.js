import { Component } from "react";
import "./signin.less";
import Link from "next/link";
import { Card, Form, Button, Input, Spin } from "antd";
import Layout from "../../components/Layout";
import { userSignIn } from "../../lib/api";

class LoginModal extends Component {
  state = {
    email: "",
    password: "",
    isLoading: false,
    error: ""
  };
  handleClick = event => {
    this.setState({
      error: ""
    });
  };
  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };
  submitHandlers = event => {
    event.preventDefault();
    this.setState({
      isLoading: true
    });
    const user = {
      email: this.state.email,
      password: this.state.password
    };

    userSignIn(user)
      .then(data => {
        localStorage.setItem("token", data.token.token);
        this.setState({
          email: "",
          password: "",
          isLoading: false
        });
      })
      .catch(this.showError);
  };
  showError = err => {
    const error = (err.response && err.response.data) || err.message;
    console.log("server response token", error);
    this.setState({ error: error.errors, isLoading: false });
  };
  render() {
    const { error, isLoading, email, password } = this.state;
    return (
      <Layout>
        <div className="container">
          <Card
            hoverable
            style={{ width: 350 }}
            title={<h2 style={{ textAlign: "center" }}>Login</h2>}
          >
            <Form style={{ marginBottom: 30, marginTop: 30 }}>
              <Form.Item onClick={this.handleClick}>
                <Input
                  placeholder="Email"
                  onChange={this.handleChange}
                  name="email"
                  value={email}
                />
                {error.email ? (
                  <span style={{ margin: 0, color: "red", marginLeft: 2 }}>
                    {error.email}
                  </span>
                ) : (
                  ""
                )}
              </Form.Item>
              <Form.Item onClick={this.handleClick}>
                <Input.Password
                  placeholder="Password"
                  onChange={this.handleChange}
                  name="password"
                  value={password}
                />
                {error.password ? (
                  <span style={{ margin: 0, color: "red", marginLeft: 2 }}>
                    {error.password}
                  </span>
                ) : (
                  ""
                )}
              </Form.Item>
              <Form.Item>
                {error.invalid ? (
                  <Link href="/user/verify">
                    <a style={{ float: "right" }}>Reset Password</a>
                  </Link>
                ) : (
                  <Link href="/user/forget">
                    <a style={{ float: "right" }}>Forget Password</a>
                  </Link>
                )}
              </Form.Item>
              <Form.Item style={{ marginTop: 20 }}>
                {isLoading ? (
                  <div className="example">
                    <Spin />
                  </div>
                ) : (
                  <Button
                    onClick={this.submitHandlers}
                    type="primary"
                    htmlType="submit"
                    block
                  >
                    Sign up
                  </Button>
                )}
              </Form.Item>
              <hr className="hr-text" data-content="OR" />

              <h6 style={{ textAlign: "center" }}>
                Don't have an account?{" "}
                <Link href="/user/signup">
                  <a style={{ fontWeight: "bold" }}> SIGNUP</a>
                </Link>
              </h6>
            </Form>
          </Card>
        </div>
      </Layout>
    );
  }
}

export default LoginModal;
