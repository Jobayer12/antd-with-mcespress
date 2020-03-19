import { Component } from "react";
import "./signin.less";
import Link from "next/link";
import { Card, Form, Button, Input, Icon, Typography } from "antd";
const { Title } = Typography;
const { Meta } = Card;
import Layout from "../../components/Layout";

class LoginModal extends Component {
  state = {
    email: "",
    password: ""
  };
  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };
  submitHandlers = event => {
    event.preventDefault();
    console.log(this.state);
  };
  render() {
    return (
      <Layout>
        <div className="container">
          {/* <Title title={<span >Title</span>} >Login</Title> */}
          <Card
            hoverable
            style={{ width: 350 }}
            title={<h2 style={{ textAlign: "center" }}>Login</h2>}
          >
            <Form style={{ marginBottom: 30, marginTop: 30 }}>
              <Form.Item>
                <Input
                  prefix={<Icon type="user" style={{ fontSize: 13 }} />}
                  placeholder="Email"
                  onChange={this.handleChange}
                  name="email"
                />
              </Form.Item>
              <Form.Item>
                <Input.Password
                  placeholder="Password"
                  onChange={this.handleChange}
                  name="password"
                />
              </Form.Item>
              <Form.Item>
                <Link href="/user/forget">
                  <a style={{ float: "right" }}>Forget Password</a>
                </Link>
              </Form.Item>
              <Form.Item>
                <Button onClick={this.submitHandlers} type="primary" block>
                  Login
                </Button>
              </Form.Item>
              <hr class="hr-text" data-content="OR" />

              <h6 style={{ textAlign: "center" }}>
                Don't have an account?{" "}
                <Link href="/user/signup" style={{ fontWeight: "bold" }}>
                  SIGNUP
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
