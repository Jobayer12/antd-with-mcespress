import { Component } from "react";
import "./signin.less";
import { Card, Row, Col, Form, Checkbox, Button, Input, Icon } from "antd";

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
          <Card hoverable style={{ width: 350, height: 250 }}>
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
                <Checkbox>Remember me</Checkbox>
              </Form.Item>
              <Form.Item>
                <Button onClick={this.submitHandlers} type="primary" block>
                  Login
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </div>
      </Layout>
    );
  }
}

export default LoginModal;
