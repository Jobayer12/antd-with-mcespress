import { Component } from "react";
import "./signin.less";
import Link from "next/link";
import { Card, Form, Button, Input } from "antd";
import Layout from "../../components/Layout";
import { successNotificaiton } from "../../components/notification";
import { userEmailVerify } from "../../lib/api";
class Forget extends Component {
  state = {
    email: "",
    isLoading: false,
    error: "",
    message: ""
  };
  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };
  submitHandlers = event => {
    event.preventDefault();
    const user = {
      email: this.state.email
    };
    userEmailVerify(user)
      .then(result => {
        this.setState({
          message: result.message,
          email: ""
        });
        successNotificaiton(
          "success",
          "bottomRight",
          "Verification email sent",
          `please cheeck you mail box to verify your email address`
        );
      })
      .catch(this.showError);
  };

  showError = err => {
    const error = (err.response && err.response.data) || err.message;
    this.setState({ error: error.errors, isLoading: false });
  };

  handleClick = event => {
    this.setState({
      error: ""
    });
  };

  render() {
    const { email, error } = this.state;
    return (
      <Layout>
        <div className="container">
          <Card
            hoverable
            style={{ width: 350 }}
            title={
              <h2 style={{ textAlign: "center", cursor: "default" }}>
                Verify Email
              </h2>
            }
          >
            <Form style={{ marginBottom: 30, marginTop: 30 }}>
              <Form.Item onClick={this.handleClick}>
                <Input
                  placeholder="Email address"
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

              <Form.Item>
                <Button
                  onClick={this.submitHandlers}
                  type="primary"
                  htmlType="submit"
                  block
                >
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </div>
      </Layout>
    );
  }
}

export default Forget;
