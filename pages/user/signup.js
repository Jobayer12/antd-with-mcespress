import { Component } from "react";
import "./signin.less";
import { Card, Form, Checkbox, Button, Input, Icon } from "antd";

import Layout from "../../components/Layout";

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
    console.log(this.state);
  };
  render() {
    return (
      <Layout>
        <div className="container">
          <Card hoverable style={{ width: 350, height: 300 }}>
            <Form>
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
                <Form.Item>
                  <Input.Password
                    placeholder="Confirm Password"
                    onChange={this.handleChange}
                    name="confirmpassword"
                  />
                </Form.Item>
              </Form.Item>
              <Form.Item>
                <Button onClick={this.submitHandlers} type="primary" block>
                  Register
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </div>
      </Layout>
    );
  }
}

export default Signup;
