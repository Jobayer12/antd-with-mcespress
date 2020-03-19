import { Component } from "react";
import "./signin.less";
import Link from "next/link";
import { Card, Form, Button, Input, Icon, Typography } from "antd";
const { Title } = Typography;
const { Meta } = Card;
import Layout from "../../components/Layout";
import { userSignup } from "../../lib/api";

class Signup extends Component {
  state = {
    email: "",
    password: "",
    confirmpassword: ""
  };
  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };
  submitHandlers = event => {
    event.preventDefault();
    const user = {
      email: this.state.email,
      password: this.state.password,
      confirmpassword: this.state.confirmpassword,
      category: "author"
    };

    userSignup(user)
      .then(response => {})
      .catch(error => {});
  };
  render() {
    return (
      <Layout>
        <div className="container">
          {/* <Title title={<span >Title</span>} >Login</Title> */}
          <Card
            hoverable
            style={{ width: 350 }}
            title={<h2 style={{ textAlign: "center" }}>SIGN UP</h2>}
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
                <Input.Password
                  placeholder="confirm password"
                  onChange={this.handleChange}
                  name="confirmpassword"
                />
              </Form.Item>

              <Form.Item>
                <Button onClick={this.submitHandlers} type="primary" block>
                  Sign up
                </Button>
              </Form.Item>
              <hr className="hr-text" data-content="OR" />

              <h6 style={{ textAlign: "center" }}>
                Already have an account?{" "}
                <Link href="/user/signin" style={{ fontWeight: "bold" }}>
                  SIGNIN
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
