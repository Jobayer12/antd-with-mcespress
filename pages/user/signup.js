import { Component } from "react";
import "./signin.less";
import { Spin } from "antd";
import Link from "next/link";
import { Card, Form, Button, Input, Icon } from "antd";
import { userSignup } from "../../lib/api";
import Layout from "../../components/Layout";

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
    console.log(user);
    userSignup(user)
      .then(message => {
        this.setState({
          message,
          isLoading: false
        });
      })
      .catch(this.showError);
  };

  showError = err => {
    const error = (err.response && err.response.data) || err.message;
    console.log(error);
    this.setState({ error: error.errors, isLoading: false });
  };

  render() {
    const { error, isLoading } = this.state;

    return (
      <Layout>
        <div className="container">
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
                  prefix={<Icon type="user" style={{ fontSize: 13 }} />}
                />
                {error.email ? (
                  <span style={{ margin: 0 }}>{error.email}</span>
                ) : (
                  ""
                )}
              </Form.Item>

              <Form.Item>
                <Input.Password
                  onChange={this.handleChange}
                  name="password"
                  placeholder="Password"
                />
              </Form.Item>
              <Form.Item>
                <Input.Password
                  onChange={this.handleChange}
                  name="confirmpassword"
                  placeholder="confirm password"
                />
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
