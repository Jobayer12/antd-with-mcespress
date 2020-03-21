import { Component } from "react";
import "./signin.less";
import Link from "next/link";
import Head from "next/head";
import { Card, Form, Button, Input, Spin, notification } from "antd";

import { userSignup } from "../../lib/api";
import Layout from "../../components/Layout";
import { successNotificaiton } from "../../components/notification";

class Signup extends Component {
  state = {
    email: "",
    password: "",
    confirmpassword: "",
    error: "",
    isLoading: false,
    message: ""
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
    this.setState({ isLoading: true });
    const user = {
      email: this.state.email,
      password: this.state.password,
      confirmpassword: this.state.confirmpassword,
      category: "author"
    };
    userSignup(user)
      .then(message => {
        this.setState({
          message,
          isLoading: false,
          email: "",
          password: "",
          confirmpassword: ""
        });
        successNotificaiton(
          "success",
          "bottomRight",
          "Account created successfully.",
          `Dear Jobayer Your account created.please cheeck you mail box to verify your email address`
        );
      })
      .catch(this.showError);
  };

  showError = err => {
    const error = (err.response && err.response.data) || err.message;
    console.log(error);
    this.setState({ error: error.errors, isLoading: false });
  };

  render() {
    const { error, isLoading, email, password, confirmpassword } = this.state;

    return (
      <Layout>
        <div className="container">
          <Head>
            <title>My page title</title>
            <meta
              name="viewport"
              content="initial-scale=1.0, width=device-width"
              key="viewport"
            />
          </Head>
          <Head>
            <meta
              name="viewport"
              content="initial-scale=1.2, width=device-width"
              key="viewport"
            />
          </Head>
          <Card
            hoverable
            style={{ width: 350 }}
            title={<h2 style={{ textAlign: "center" }}>SIGN UP</h2>}
          >
            <Form style={{ marginBottom: 30, marginTop: 30 }}>
              <Form.Item onClick={this.handleClick}>
                <Input
                  onChange={this.handleChange}
                  name="email"
                  placeholder="Email"
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
                  onChange={this.handleChange}
                  name="password"
                  placeholder="Password"
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
              <Form.Item onClick={this.handleClick}>
                <Input.Password
                  onChange={this.handleChange}
                  name="confirmpassword"
                  placeholder="confirm password"
                  value={confirmpassword}
                />
                {error.confirmpassword ? (
                  <span style={{ margin: 0, color: "red", marginLeft: 2 }}>
                    {error.confirmpassword}
                  </span>
                ) : (
                  ""
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
                Already have an account?{" "}
                <Link href="/user/signin">
                  <a style={{ fontWeight: "bold" }}> SIGNIN </a>
                </Link>
              </h6>
            </Form>
          </Card>
        </div>
      </Layout>
    );
  }
}

export default Signup;
