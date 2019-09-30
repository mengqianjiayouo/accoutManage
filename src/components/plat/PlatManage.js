import React, { Component } from "react";
import { Input, Table, Button, Icon, Modal, Form, Col, Row, Alert } from "antd";
import { Api } from "../.././server/_ajax.js";
import dateformat from "dateformat-util";
import edit_icon from "../../image/edit.svg";
import delete_icon from "../../image/delete.svg";
const api = new Api();
const FormItem = Form.Item;

const formItemLayout = {
  labelCol: { span: 7 },
  wrapperCol: { span: 14 }
};
class PlatManage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      platList: [],
      loading: false,
      columns: [],
      platform_id: "",
      modalTitle: "",
      addEditVisible: false,
      isAdd: true,
      platform_flag: "",
      platform_flag_status: "",
      platform_name: "",
      platform_name_status: "",
      noChoice: false,
      message: ""
    };
  }

  componentDidMount() {
    this.getData();
    this.setColumn();
  }

  setColumn() {
    const columns = [
      {
        title: "序号",
        dataIndex: "index",
        key: "index",
        width: 60
      },
      {
        title: "操作",
        key: "action",
        width: 92,
        render: a => {
          return (
            <div>
              <img
                src={edit_icon}
                className="admin_action"
                alt=""
                onClick={() => {
                  this.setState(
                    {
                      platform_id: a.platform_id
                    },
                    () => this.getPlatDetail()
                  );
                }}
              />
              {/* <img src={delete_icon} className="admin_action" alt=""
                             onClick={()=>{
                                 Modal.confirm({
                                     title:'确定要删除该平台？',
                                     okText: '确定',
                                     cancelText: '取消',
                                     onOk:()=>{
                                         this.deletePlat(a.platform_id)
                                     }
                                 })
                             }}
                        />*/}
            </div>
          );
        }
      },
      {
        title: "平台名称",
        dataIndex: "platform_name",
        key: "platform_name"
      },
      {
        title: "平台标识",
        dataIndex: "platform_flag",
        key: "platform_flag"
      },
      {
        title: "创建时间",
        key: "add_time",
        dataIndex: "add_time",
        render: a => {
          return (
            <div>
              {dateformat.format(new Date(a * 1000), "yyyy-MM-dd hh:mm")}
            </div>
          );
        }
      }
    ];
    this.setState({
      columns
    });
  }

  deletePlat(id) {
    // api.$post("/api/account/delete_platform/", { platform_id: id }, () => {
    //   this.getData();
    // });
  }

  getPlatDetail() {
    const { platform_id } = this.state;
    // api.$get("/api/account/platform_detail/", { platform_id }, res => {
    //   this.setState({
    //     modalTitle: "平台编辑",
    //     addEditVisible: true,
    //     isAdd: false,
    //     platform_flag: res.platform_flag,
    //     platform_name: res.platform_name
    //   });
    // });
  }

  getData() {
    this.setState({
      loading: true
    });
    // api.$get("/api/account/platform_list/", null, res => {
    //   res.map((a, b) => {
    //     a.index = b + 1;
    //     a.key = b + 1;
    //   });
    //   this.setState({
    //     platList: res,
    //     loading: false
    //   });
    //   if (res.length <= 0) {
    //     this.setState({
    //       locale: {
    //         emptyText: "没有相关数据"
    //       }
    //     });
    //   }
    // });
  }

  // 编辑和添加
  addEditModal() {
    const {
      modalTitle,
      addEditVisible,
      platform_flag,
      platform_flag_status,
      platform_name,
      platform_name_status,
      noChoice
    } = this.state;
    return (
      <Modal
        title={modalTitle}
        wrapClassName="admin_modal column"
        width={"520px"}
        visible={addEditVisible}
        onCancel={this.clearForm.bind(this)}
        footer={
          <div className="action">
            <Button
              style={{ backgroundColor: "transparent" }}
              onClick={this.clearForm.bind(this)}
            >
              关闭
            </Button>
            {this.state.isLook ? null : (
              <Button
                className=" add_btn"
                onClick={this.handleModelOk.bind(this)}
              >
                保存
              </Button>
            )}
          </div>
        }
      >
        <FormItem
          {...formItemLayout}
          label={
            <span>
              <i>*</i>平台名称
            </span>
          }
          validateStatus={platform_name_status}
        >
          <Input
            placeholder="请输入平台名称"
            className="input"
            value={platform_name}
            onChange={e => {
              this.setState({
                platform_name: e.target.value
              });
            }}
          />
        </FormItem>

        <FormItem
          {...formItemLayout}
          label={
            <span>
              <i>*</i>平台标识
            </span>
          }
          validateStatus={platform_flag_status}
        >
          <Input
            placeholder="2-12个英文字母"
            className="input"
            value={platform_flag}
            disabled={this.state.isLook}
            onChange={e => {
              this.setState({
                platform_flag: e.target.value
              });
            }}
          />
        </FormItem>
        {noChoice ? (
          <Alert
            message={this.state.message}
            type="error"
            closable
            showIcon={true}
            // onClose={onClose}
          />
        ) : null}
      </Modal>
    );
  }

  clearForm() {
    this.setState({
      addEditVisible: false,
      platform_name: "",
      platform_name_status: "",
      platform_flag: "",
      platform_flag_status: ""
    });
  }

  handleModelOk() {
    const { isAdd, platform_name, platform_flag, platform_id } = this.state;

    if (!platform_name) {
      this.setState({
        noChoice: true,
        message: "您还没有输入平台名称！",
        platform_name_status: "error"
      });
      window.setTimeout(() => {
        this.setState({
          noChoice: false
        });
      }, 5000);
      return;
    }
    if (!platform_flag) {
      this.setState({
        noChoice: true,
        message: "您还没有输入平台标识！",
        platform_flag_status: "error"
      });
      window.setTimeout(() => {
        this.setState({
          noChoice: false
        });
      }, 5000);
      return;
    }
    if (isAdd) {
      /*创建新权限*/
    /*   api.$post(
        "/api/account/create_platform/",
        { platform_id, platform_name, platform_flag },
        res => {
          if (!res.errmsg) {
            this.setState({
              addEditVisible: false
            });
            Modal.success({
              title: "提示",
              content: "平台创建成功！",
              onOk: () => {
                this.getData();
                this.clearForm();
              }
            });
          } else {
            this.setState({
              noChoice: true,
              message: res.errmsg
            });
            window.setTimeout(() => {
              this.setState({
                noChoice: false
              });
            }, 5000);
          }
        }
      ); */
    } else {
     /*  api.$post(
        "/api/account/platform_detail/",
        { platform_id, platform_name, platform_flag, platform_id },
        res => {
          if (!res.errmsg) {
            this.setState({
              addEditVisible: false
            });
            Modal.success({
              title: "提示",
              content: "平台修改成功！",
              onOk: () => {
                this.getData();
                this.clearForm();
              }
            });
          } else {
            this.setState({
              noChoice: true,
              message: res.errmsg
            });
            window.setTimeout(() => {
              this.setState({
                noChoice: false
              });
            }, 5000);
          }
        }
      ); */
    }
  }

  render() {
    return (
      <div className="admin plat">
        <Button
          className="add_btn"
          onClick={() => {
            this.setState({
              addEditVisible: true,
              modalTitle: "平台新建",
              isAdd: true
            });
          }}
        >
          <Icon type="plus" />
          新增
        </Button>
        <div className="tableWarp">
          <Table
            columns={this.state.columns}
            dataSource={this.state.platList}
            bordered
            loading={this.state.loading}
            pagination={false}
          />
        </div>
        {this.addEditModal()}
      </div>
    );
  }
}

export default PlatManage;
