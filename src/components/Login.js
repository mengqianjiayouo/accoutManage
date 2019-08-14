import React, { Component } from "react";

import { connect } from "react-redux";

import $ from "jquery";
import { login } from "../actions";
import { Button, Input, Icon } from "antd";
import loginlogo from "../image/dash_logo.svg";
import loginfont from "../image/loginfont.svg";
import loginTitle from "../image/loginTitle.svg";
import picture from "../image/picture.png";
import login_word1 from "../image/login_word1.svg";
import login_word2 from "../image/login_word2.svg";
import login_seal from "../image/login_seal.png";
import user from "../image/user.svg";
import pass from "../image/password.svg";

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      checked: false,
      username: "",
      password: "",
      errmsg: ""
    };
    this.handleKeyUp = this.handleKeyUp.bind(this);
  }

  componentWillMount() {}

  componentDidMount() {
    window.addEventListener("keyup", this.handleKeyUp);
  }

  componentWillUnmount() {
    window.removeEventListener("keyup", this.handleKeyUp);
  }

  handleClick() {
    this.login();
  }

  handleKeyUp(event) {
    if (event.keyCode === 13) this.login();
  }

  login() {
    const { dispatch } = this.props;

    const { username, password } = this.state;

    if (username == "") {
      this.setState({
        errmsg: "请输入账户！"
      });
      return;
    }
    if (password == "") {
      this.setState({
        errmsg: "请输入密码！"
      });
      return;
    }
    if (!username) return this.setState({});
    if (!password) return this.setState({});

    let data = {
      username: username,
      password: password
    };

    this.setState({ isLoading: true });
    dispatch(login({ username: "megnqian" }));
    sessionStorage.setItem("isLogin", true);
    this.props.history.replace("/");
    /*  $.ajax({
      url: "/api/account/login/",
      type: "POST",
      data: data,
      dataType: "json",
      beforeSend: function(xhr) {
        xhr.withCredentials = true;
      },
      crossDomain: true,
      success: res => {
        if (res.data.errmsg) {
          this.setState({
            errmsg: res.data.errmsg,
            isLoading: false
          });
          return;
        }
        // dispatch(login(res.data));

        this.setState({ isLoading: false });

        this.props.history.replace("/");
      }
    }); */
  }

  render() {
    const { username, password, errmsg } = this.state;

    let { isLoading } = this.state;

    return (
      <div className="loginwarp">
        <div className="container">
          <form className="login">
            <p className="title">管理系统</p>
            {errmsg ? (
              <div className="err">
                <Icon
                  type="close-circle-o"
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    this.setState({
                      errmsg: ""
                    });
                  }}
                />
                <span>{errmsg}</span>
              </div>
            ) : null}
            <Input
              id="user"
              value={username ? username : ""}
              placeholder="账户"
              addonBefore={
                <i>
                  <img src={user} alt="" />
                </i>
              }
              onChange={e => {
                this.setState({
                  username: e.target.value
                });
              }}
            />
            <Input
              onChange={e => {
                this.setState({
                  password: e.target.value
                });
              }}
              type="password"
              value={password ? password : ""}
              placeholder="密码"
              addonBefore={
                <i>
                  <img src={pass} alt="" />
                </i>
              }
            />
            <Button
              key="submit"
              size="large"
              loading={isLoading}
              onClick={this.handleClick.bind(this)}
            >
              登录
            </Button>
            <div className="bottom-font">
              <img src={loginfont} alt="" />
            </div>
          </form>
          <div className="img">
            <img className="picture" src={picture} alt="" />
            <div className="word">
              <img src={login_word1} alt="" className="word1" />
              <img src={login_seal} alt="" className="seal" />
            </div>
            <img src={login_word2} alt="" className="word2" />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { user } = state.login;

  return {
    user: user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    dispatch
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
