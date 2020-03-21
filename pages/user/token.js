import React, { Component } from "react";
import "../../less/token.less";
import { Result, Button, Spin } from "antd";
import queryString from "query-string";
import { withRouter } from "next/router";
import Layout from "../../components/Layout";
import { userVerify } from "../../lib/api";

class Token extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      isSuccess: true,
      search: queryString.parse(this.props.router.asPath.split(/\?/)[1]),
      error: "",
      response: ""
    };
  }
  componentDidMount() {
    this.setState({ isLoading: true });
    userVerify(this.state.search.token)
      .then(result => {
        this.setState({
          response: result,
          isLoading: false,
          isSuccess: result.message.success
        });
      })
      .catch(this.showError);
  }
  showError = err => {
    const error = (err.response && err.response.data) || err.message;
    console.log(error);
    this.setState({ error: error.errors, isLoading: false, isSuccess: false });
  };

  render() {
    const { isSuccess, isLoading } = this.state;

    return (
      <Layout>
        {isLoading ? (
          <Spin className="example" />
        ) : (
          <div className="success">
            {isSuccess ? (
              <Result
                status="success"
                title="Account verified Successfully."
                subTitle="Now you can login"
                extra={[
                  <Button href="/user/signin" type="primary" key="console">
                    Go Login page
                  </Button>
                ]}
              />
            ) : (
              <Result
                status="warning"
                title="Invalid token"
                subTitle="your token are invalid.Go to verification page to get another token"
                extra={
                  <Button href="/user/verify" type="primary" key="console">
                    Go Verify page
                  </Button>
                }
              />
            )}
          </div>
        )}
      </Layout>
    );
  }
}

export default withRouter(Token);
