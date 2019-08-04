import React, { Component } from "react";
import { connect } from "react-redux";
import { Menu } from "antd";
import side_admin from "../image/side_admin.svg";
import side_permiss from "../image/side_permiss.svg";
import side_plat from "../image/side_plat.svg";
import side_role from "../image/side_role.svg";

class SideBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      openKeys: [],
      selectedKey: "",
      checkedMenu: "",
      defKey: ""
    };
  }

  componentDidMount() {
    this.setState({
      defKey: this.props.defKey
    });
  }

  componentWillReceiveProps(props) {}

  addTabs(name) {
    this.props.onTabEdit(name, "add");
  }
  render() {
    return (
      <div className="sideBar">
        <div className="side-title">管理系统</div>
        <Menu theme="dark" mode="inline" selectedKeys={[this.state.defKey]}>
          <Menu.Item key="AdminManage">
            <span
              onClick={() => {
                this.addTabs("AdminManage");
                this.setState({
                  defKey: "AdminManage"
                });
              }}
            >
              {/* <img
                src={side_admin}
                style={{ marginRight: "5px", verticalAlign: "sub" }}
                alt=""
              /> */}
              会员管理
            </span>
          </Menu.Item>
          <Menu.Item key="AgentManage">
            <span
              onClick={() => {
                this.addTabs("AgentManage");
                this.setState({
                  defKey: "AgentManage"
                });
              }}
            >
              代理商管理
            </span>
          </Menu.Item>
          <Menu.Item key="RoleManage">
            <span
              onClick={() => {
                this.addTabs("RoleManage");
                this.setState({
                  defKey: "RoleManage"
                });
              }}
            >
              角色管理
            </span>
          </Menu.Item>
          <Menu.Item key="PowerManage">
            <span
              onClick={() => {
                this.addTabs("PowerManage");
                this.setState({
                  defKey: "PowerManage"
                });
              }}
            >
              权限管理
            </span>
          </Menu.Item>
          <Menu.SubMenu key="sub1" title={<span>产品库管理</span>}>
            <Menu.Item
              key="UserProductManage"
              onClick={() => {
                this.addTabs("UserProductManage");
                this.setState({
                  defKey: "UserProductManage"
                });
              }}
            >
              用户产品
            </Menu.Item>
            <Menu.Item
              key="PlatProductManage"
              onClick={() => {
                this.addTabs("PlatProductManage");
                this.setState({
                  defKey: "PlatProductManage"
                });
              }}
            >
              平台产品
            </Menu.Item>
          </Menu.SubMenu>
          <Menu.Item key="OrderManage">
            <span
              onClick={() => {
                this.addTabs("OrderManage");
                this.setState({
                  defKey: "OrderManage"
                });
              }}
            >
              订单管理
            </span>
          </Menu.Item>
          <Menu.Item key="StoreManage">
            <span
              onClick={() => {
                this.addTabs("StoreManage");
                this.setState({
                  defKey: "StoreManage"
                });
              }}
            >
              仓库管理
            </span>
          </Menu.Item>

          <Menu.Item key="NoLogisistManage">
            <span
              onClick={() => {
                this.addTabs("NoLogisistManage");
                this.setState({
                  defKey: "NoLogisistManage"
                });
              }}
            >
              订单未发物流预警
            </span>
          </Menu.Item>
          <Menu.Item key="ContractorManage">
            <span
              onClick={() => {
                this.addTabs("ContractorManage");
                this.setState({
                  defKey: "ContractorManage"
                });
              }}
            >
              第三方承包方管理
            </span>
          </Menu.Item>

          <Menu.Item key="FactoryManage">
            <span
              onClick={() => {
                this.addTabs("FactoryManage");
                this.setState({
                  defKey: "FactoryManage"
                });
              }}
            >
              厂家管理
            </span>
          </Menu.Item>
        </Menu>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { user } = state.login;

  return {
    user
  };
};

export default connect(mapStateToProps)(SideBar);
