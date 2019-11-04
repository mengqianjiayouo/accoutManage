import React, { Component } from "react";
import { connect } from "react-redux";
import createBrowserHistory from "history/createBrowserHistory";
import { login, search } from "../actions";
import { Input } from "antd";
import { Menu, Dropdown, Icon } from "antd";
import { clearCookie } from "../server/cookies";
const history = createBrowserHistory();

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isSearch: false,
      searching: false,
      searchValidationState: null
      // uid:localStorage.getItem('uid')
    };

    this.handleKeyUp = this.handleKeyUp.bind(this);
  }

  componentDidMount() {
    const { user, dispatch } = this.props;

    /* api.$get(  '/api/account/login/', null, res => {

            if (!res.user_name){
                return this.props.history.push('/login')
            }
            dispatch(login(res))

        }) */

    window.addEventListener("keyup", this.handleKeyUp);
  }

  componentWillUnmount() {
    window.removeEventListener("keyup", this.handleKeyUp);
  }

  handleToGuide() {
    history.replace("/guide");
  }

  handleLogout() {
    clearCookie("authorization");
    clearCookie("ApiKey");
    clearCookie("token_type");
    this.props.history.replace("/login");
  }

  handleChange() {
    this.setState({
      searchValidationState: null
    });
  }

  handleFocus() {
    this.setState({ searching: true });
  }

  handleBlur() {
    this.setState({
      searching: false,
      searchValidationState: null
    });
  }

  handleSearch(value) {
    this.searchEvent(value);
  }

  handleKeyUp(event) {
    const { searching } = this.state;

    if (event.keyCode === 13 && searching) this.searchEvent();
  }

  /* searchEvent(value) {

        const {dispatch, type} = this.props

        if (!value) return this.setState({
            searchValidationState: 'error',
        })

        api.$get(  '/dash/search/', {text: value, type: type}, res => {

            dispatch(search({res, value, type}))
            history.replace('/search')
        })

    }*/

  /*  search() {

        const {/!*searchValidationState,*!/ isSearch} = this.state
        const Search = Input.Search
        /!*const selectAfter = (
         <Icon type="search" onClick={ !isSearch ? this.handleSearch.bind(this) : null }/>
         )*!/
        return (

            <Search
                placeholder="查找上架商品/商家"
                style={{width: 340,marginRight:25}}
                onSearch={() => {
                    !isSearch ? this.handleSearch() : null
                }}
            />

        )
    }*/

  render() {
    const { user } = this.props;

    const menu = (
      <Menu>
        <Menu.Item
          key="0"
          onClick={e => {
            console.log(e);
          }}
        >
          密码重置
        </Menu.Item>
      </Menu>
    );
    return (
      <div className="header bgColorGray">
        <div className="topbarCont">
          <div className="userInfo">
            <span style={{ color: "#222", marginRight: "10px" }}>
              {user ? "您好," + user : "您好"}
            </span>
            <a
              href="javascript:;"
              className="colorMin header-logout"
              onClick={this.handleLogout.bind(this)}
            >
              退出
            </a>
          </div>
          {/*{this.search()}*/}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { type } = state.search;
  return {
    user: state.login.user,
    type: type || 1
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
)(Header);
