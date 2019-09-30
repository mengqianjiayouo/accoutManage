import React, { Component } from "react";
import {
  Input,
  Select,
  Table,
  Button,
  Icon,
  Modal,
  Form,
  Col,
  Checkbox,
  Radio,
  Row,
  Tabs,
  Alert
} from "antd";
import { Api } from "../.././server/_ajax.js";
import edit_icon from "../../image/edit.svg";
import look_icon from "../../image/look.svg";
import delete_icon from "../../image/delete.svg";
const Option = Select.Option;
const FormItem = Form.Item;
const api = new Api();
const formItemLayout = {
  labelCol: { span: 7 },
  wrapperCol: { span: 14 }
};
class FinancialManage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount() {
    this.setColumn();
  }

  componentDidMount() {}
  componentWillReceiveProps() {}

  topBar() {
    return (
      <div className="search-title" style={{ minWidth: "1170px" }}>
        {/*平台*/}
        <div className="params params-20" style={{ minWidth: "97px" }}>
          <span>平台：</span>
          <Select
            value={this.state.platform_id + ""}
            style={{ width: 200 }}
            onChange={val => {
              this.setState(
                {
                  platform_id: val,
                  page_num: 1,
                  page_size: 20
                },
                () => {
                  this.getPermissList();
                }
              );
            }}
          >
            {this.state.platList.map(a => {
              return (
                <Option value={a.platform_id + ""} key={a.platform_id + ""}>
                  {a.platform_name}
                </Option>
              );
            })}
          </Select>
        </div>
        {/*关键字*/}
        <div className="params params-20" style={{ minWidth: "170px" }}>
          <span>关键字：</span>
          <Input
            placeholder="请输入权限名称、标识"
            value={this.state.kw}
            style={{ width: "200px" }}
            onChange={e => {
              this.setState(
                {
                  kw: e.target.value
                },
                () => this.getPermissList()
              );
            }}
          />
        </div>

        {/*查询和清空*/}
        <div className="params" style={{ marginRight: "60px" }}>
          <Button
            className="search-btn"
            onClick={() => {
              this.getPermissList();
            }}
          >
            查询
          </Button>
          <Button
            style={{
              maxWidth: "60px",
              backgroundcolor: "#fff",
              borderColor: "#d9d9d9",
              color: "#222",
              marginLeft: "12px"
            }}
            onClick={() => {
              this.setState(
                {
                  kw: ""
                },
                () => this.getPermissList()
              );
            }}
          >
            清空
          </Button>
        </div>
      </div>
    );
  }
  setColumn() {
    const columns = [
      {
        title: "用户名",
        dataIndex: "user_name",
        key: "user_name"
      },
      {
        title: "用户密码更新时间",
        dataIndex: "user_password_update_time",
        key: "user_password_update_time"
      },
      {
        title: "角色名称",
        dataIndex: "up_name",
        key: "up_name"
      },
      {
        title: "电话",
        dataIndex: "user_phone",
        key: "user_phone"
      },
      {
        title: "权限名称",
        dataIndex: "ur_name",
        key: "ur_name"
      },
      {
        title: "菜单ID",
        dataIndex: "um_id",
        key: "um_id"
      },
      {
        title: "操作",
        key: "action",
        width: 118,
        render: a => {
          return (
            <div>
              <img
                src={edit_icon}
                className="role_action"
                alt=""
                onClick={() => {
                  //  this.getPermissDetail(a.permission_id)
                  this.setState({
                    //  permission_id:a.permission_id,
                    modalTitle: "权限编辑"
                  });
                }}
              />
              <img
                src={delete_icon}
                className="role_action"
                alt=""
                onClick={() => {
                  Modal.confirm({
                    title: "确定要删除该权限？",
                    okText: "确定",
                    cancelText: "取消",
                    onOk: () => {
                      this.deletePermiss(a.us_id);
                    }
                  });
                }}
              />
              <img
                src={look_icon}
                className="role_action"
                alt=""
                onClick={() => {
                  this.getPermissDetail(a.us_id);
                  this.setState({
                    us_id: a.us_id,
                    modalTitle: "权限查看",
                    isLook: true
                  });
                }}
              />
            </div>
          );
        }
      }
    ];
    this.setState({
      columns
    });
  }

  // 编辑和添加弹窗

  clearForm() {
    this.setState({});
  }

  render() {
    return <div className="power" />;
  }
}

export default FinancialManage;
