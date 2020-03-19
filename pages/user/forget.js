import { Component } from "react";
import "./signin.less";
import Link from "next/link";
import { Card, Form, Button, Input, Icon, Typography } from "antd";
const { Title } = Typography;
const { Meta } = Card;
import Layout from "../../components/Layout";

class Forget extends Component {
  state = {
    email: ""
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
          <Card
            hoverable
            style={{ width: 350 }}
            title={
              <h2 style={{ textAlign: "center", cursor: "default" }}>
                Forgot password
              </h2>
            }
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
                <Button onClick={this.submitHandlers} type="primary" block>
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
