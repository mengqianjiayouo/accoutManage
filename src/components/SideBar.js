import React, { Component } from "react";
import { connect } from "react-redux";
import { Menu } from "antd";
import { Api } from ".././server/_ajax.js";
import side_admin from "../image/side_admin.svg";
import side_permiss from "../image/side_permiss.svg";
import side_plat from "../image/side_plat.svg";
import side_role from "../image/side_role.svg";
const api = new Api();
/* AdminManage: "会员管理",
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
  FactoryManage: "厂家管理" */
const roleSide = {
  超级管理员: [
    "AdminManage",
    "AgentManage",
    "RoleManage",
    "PowerManage",
    "UserProductManage",
    "PlatProductManage",
    "StoreManage",
    "OrderManage",
    "NoLogisistManage",
    "ContractorManage",
    "FactoryManage"
  ],
  仓库管理员: ["StoreManage"],
  订单管理员: ["OrderManage"],
  权限管理员: ["PowerManage"],
  财务人员: ["FinancialManage"]
};
class SideBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      openKeys: [],
      selectedKey: "",
      checkedMenu: "",
      defKey: "",
      userList: ["超级管理员"]
    };
  }

  componentDidMount() {
    this.setState(
      {
        defKey: this.props.defKey
      },
      () => {
        this.getPermissList();
      }
    );
  }

  componentWillReceiveProps(props) {}

  getPermissList() {
    let { page_num, page_size, defKey } = this.state;
    let obj = {};
    obj.page_num = page_num;
    obj.page_size = page_size;

    this.setState({
      // loading:true
    });
   /*  api.$get("http://118.25.155.176:8080/getUrserRight", null, res => {
      let ary = [];
      res.map(a => {
        ary.push(a.up_name);
        if (
          roleSide[a.up_name].indexOf(defKey) === -1 ||
          this.props.tabs.length === 0
        ) {
          this.addTabs(roleSide[a.up_name][0]);
        }
      });

      // this.setState({ userList: ary });
    }); */
  }
  addTabs(name) {
    this.props.onTabEdit(name, "add");
  }
  render() {
    const { userList } = this.state;
    return (
      <div className="sideBar">
        <div className="side-title">管理系统</div>
        <Menu theme="dark" mode="inline" selectedKeys={[this.state.defKey]}>
          {userList.indexOf("超级管理员") !== -1 ? (
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
          ) : null}
          {userList.indexOf("超级管理员") !== -1 ? (
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
          ) : null}
          {userList.indexOf("超级管理员") !== -1 ? (
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
          ) : null}
          {userList.indexOf("超级管理员") !== -1 ||
          userList.indexOf("权限管理员") !== -1 ? (
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
          ) : null}
          {userList.indexOf("超级管理员") !== -1 ? (
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
          ) : null}
          {userList.indexOf("超级管理员") !== -1 ||
          userList.indexOf("订单管理员") !== -1 ? (
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
          ) : null}
          {userList.indexOf("超级管理员") !== -1 ||
          userList.indexOf("仓库管理员") !== -1 ? (
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
          ) : null}
          {userList.indexOf("超级管理员") !== -1 ? (
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
          ) : null}
          {userList.indexOf("超级管理员") !== -1 ? (
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
          ) : null}
          {userList.indexOf("超级管理员") !== -1 ? (
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
          ) : null}
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
