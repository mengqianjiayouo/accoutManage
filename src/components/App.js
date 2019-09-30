import React, { Component } from "react";
import SideBar from "./SideBar";

import HeaderSide from "./Header";
import { Tabs, Dropdown, Layout, Menu, Icon } from "antd";
import { connect } from "react-redux";
import { add, remove, other, removeall, addActiveKey } from "../actions.js";
// import {Api} from '../server/_ajax.js'
import $ from "jquery";
//会员管理
import AdminManage from "./admin/AdminManage.js";
//角色管理
import RoleManage from "./role/RoleManage.js";
//权限管理
import PowerManage from "./power/PowerManage.js";
//平台管理
import PlatManage from "./plat/PlatManage.js";
//代理商管理
import AgentManage from "./agent/AgentManage.js";
//仓库管理
import StoreManage from "./store/StoreManage.jsx";
//订单管理
import OrderManage from "./order/OrderManage.jsx";
//产品库管理 - 平台产品
import PlatProductManage from "./products/PlatProductManage.jsx";
//产品库管理 - 平台产品
import UserProductManage from "./products/UserProductManage.jsx";
//第三方承包方管理
import ContractorManage from "./contractor/ContractorManage.jsx";
//厂家管理
import FactoryManage from "./factory/FactoryManage.jsx";
//财务管理
import FinancialManage from "./financial/FinancialManage.jsx";
import { getCookie } from "../server/cookies";
import { Api } from "../server/_ajax";
const { Header, Sider, Content } = Layout;

const TabPane = Tabs.TabPane;
const api = new Api();

const TabsName = {
  AdminManage: "会员管理",
  AgentManage: "代理商管理",
  RoleManage: "角色管理",
  PowerManage: "权限管理",
  UserProductManage: "用户产品",
  PlatProductManage: "平台产品",
  StoreManage: "仓库管理",
  //   PlatManage: "平台管理",
  OrderManage: "订单管理",
  NoLogisistManage: "订单未发物流预警",
  ContractorManage: "第三方承包方管理",
  FactoryManage: "厂家管理",
  FinancialManage: "财务管理"
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeKey: "",
      tipAry: [],
      checkedMenu: ""
    };
  }

  componentWillMount() {
    this.setState({
      activeKey: this.props.addActiveKey
    });
  }
  componentDidMount() {
    this.showMenu2();
    let authorization = getCookie("authorization"),
      apiKey = getCookie("ApiKey");
    if (!authorization || !apiKey) {
      this.props.history.push("/login");
      return;
    }
    this.getTabsInfo(this.props);
    $(window).resize(() => {
      this.changeTabMaxwidth();
    });
  }

  componentWillReceiveProps(nextProps) {
    this.getTabsInfo(nextProps);
    this.changeTabMaxwidth();
  }
  changeTabMaxwidth() {
    let wid = $(".content").css("width");
    if (this.state.tipAry.length > 0) {
      $($(".ant-tabs-bar")[0]).css("maxWidth", parseFloat(wid) - 183);
    }
  }
  getTabsInfo(props) {
    this.setState({
      tipAry: props.tabs
    });
  }

  onTabChange(activeKey) {
    this.setState({
      activeKey
    });
    this.props.dispatch(addActiveKey(activeKey));
  }

  onTabEdit(targetKey, action) {
    const { dispatch } = this.props;
    if (action == "add") {
      dispatch(add(targetKey));
      this.setState({
        activeKey: targetKey
      });
      dispatch(addActiveKey(targetKey));
      this.getTabsInfo(this.props);
      return;
    }

    if (action == "remove") {
      let index = "";
      this.state.tipAry.map((a, b) => {
        if (a == targetKey) {
          index = b;
        }
      });

      if (this.state.activeKey == targetKey) {
        if (index > 0) {
          this.setState({
            activeKey: this.state.tipAry[index - 1]
          });
          dispatch(addActiveKey(this.state.tipAry[index - 1]));
        } else {
          this.setState({
            activeKey: this.state.tipAry[index + 1]
          });
          if (this.state.tipAry[index + 1]) {
            dispatch(addActiveKey(this.state.tipAry[index + 1]));
          }
        }
      }
      dispatch(remove(targetKey));

      return;
    }
    if (action == "other") {
      this.setState({
        activeKey: targetKey
      });
      dispatch(addActiveKey(targetKey));
      dispatch(other(targetKey));
      return;
    }
    if (action == "removeall") {
      /*this.setState({
             activeKey:targetKey
             })*/
      dispatch(removeall(targetKey));
      return;
    }
  }

  showMenu2(a) {
    let { isMenuShow } = this.state;

    if (a) {
      $(".menu2").css("width", 156);
      $(".menu2").css("flex", "0 0 156px");
      this.setState({
        isMenuShow: false
      });
      return;
    }

    if (!isMenuShow) {
      $(".menu2").css("width", 0);
      $(".menu2").css("flex", "0 0 0");
      this.setState({
        isMenuShow: !isMenuShow
      });
    } else {
      $(".menu2").css("width", 156);
      $(".menu2").css("flex", "0 0 156px");
      this.setState({
        isMenuShow: !isMenuShow
      });
    }
  }

  render() {
    const props = this.props;
    let { activeKey } = this.state;
    let TabsContent = {
      AdminManage: <AdminManage />,
      AgentManage: <AgentManage />,
      RoleManage: <RoleManage />,
      PowerManage: <PowerManage />,
      UserProductManage: <UserProductManage />,
      PlatProductManage: <PlatProductManage />,
      StoreManage: <StoreManage addActiveKey={this.props.addActiveKey} />,
      //   PlatManage: <PlatManage />,
      OrderManage: <OrderManage addActiveKey={this.props.addActiveKey} />,
      ContractorManage: <ContractorManage />,
      NoLogisistManage: <PlatManage />,
      FactoryManage: <FactoryManage />,
      FinancialManage: <FinancialManage />
    };
    const menu = (
      <Menu
        onClick={e => {
          if (e.key == 0) {
            this.onTabEdit(this.state.activeKey, "remove");
            return;
          }
          if (e.key == 1) {
            this.onTabEdit(this.state.activeKey, "other");
            return;
          }
          if (e.key == 2) {
            this.onTabEdit(this.state.activeKey, "removeall");
          }
        }}
        style={{
          top: "-3px"
        }}
      >
        <Menu.Item key="0">关闭当前页</Menu.Item>
        <Menu.Item key="1">关闭其他页</Menu.Item>
        {/* <Menu.Item key="2">关闭所有页</Menu.Item> */}
      </Menu>
    );
    return (
      <div>
        <Layout style={{ height: "100%", minHeight: "800px" }}>
          <Sider
            className="menu1"
            width="180"
            style={{
              background: "linear-gradient(-180deg, #262a41 0%, #475071 100%)",
              height: "100%",
              minHeight: "800px"
            }}
          >
            <SideBar
              {...props}
              onTabEdit={(a, b) => {
                this.onTabEdit(a, b);
              }}
              defKey={activeKey}
            />
          </Sider>
          <Layout>
            <Header>
              <HeaderSide {...props} />
            </Header>
            <Content className="content">
              {this.state.tipAry.length > 0 ? (
                <Tabs
                  onChange={val => {
                    this.onTabChange(val);
                  }}
                  activeKey={this.state.activeKey}
                  type="editable-card"
                  className="tab"
                  onEdit={(a, b) => this.onTabEdit(a, b)}
                  tabBarExtraContent={
                    <div>
                      <Dropdown overlay={menu} trigger={["click"]}>
                        <div className="drop">
                          <Icon type="caret-down" />
                        </div>
                      </Dropdown>
                    </div>
                  }
                  hideAdd={true}
                >
                  {this.state.tipAry.map(a => {
                    return (
                      <TabPane tab={TabsName[a]} key={a} closable={true}>
                        {TabsContent[a]}
                      </TabPane>
                    );
                  })}
                </Tabs>
              ) : null}
            </Content>
          </Layout>
        </Layout>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return { ...state };
};

const mapDispatchToProps = dispatch => {
  return {
    dispatch
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
