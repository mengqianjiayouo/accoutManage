import React, { Component } from "react";
import {
  Input,
  Table,
  Button,
  Icon,
  Modal,
  Form,
  Menu,
  Dropdown,
  Alert,
  Select
} from "antd";
import $ from "jquery";

const FormItem = Form.Item;
const reason = ["颜色不对", "有破损", "数量不对", "违禁物品"];

const formItemLayout = {
  labelCol: { span: 7 },
  wrapperCol: { span: 14 }
};
class StoreManage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      storeList: [],
      reason: "",
      loading: false,
      columns: [],
      order_id: "",
      modalTitle: "",
      addEditVisible: false,
      isAdd: false,
      reason_status: "",
      noChoice: false,
      message: "",
      freight_number: "",
      order_number: "",
      abnormal_order: ""
    };
  }

  componentDidMount() {
    // this.getData();
    this.setColumn();
    this.getFocus();
  }

  componentWillReceiveProps(props) {
    if (props.addActiveKey === "StoreManage") {
      this.getFocus();
    }
  }
  getFocus() {
    setTimeout(() => {
      $(".store_freight")[0].focus();
    }, 50);
  }

  //产品名称、运单号、产品属性、国外地址、操作 操作：发货、滞留（颜色不对、尺寸不对、数量不对、其他）

  setColumn() {
    const columns = [
      {
        title: "产品名称",
        dataIndex: "name",
        key: "name"
      },
      {
        title: "运单号",
        dataIndex: "freight_number",
        key: "freight_number"
      },
      {
        title: "产品属性",
        dataIndex: "pc_attrice",
        key: "pc_attrice"
      },
      {
        title: "国外地址",
        key: "address",
        dataIndex: "address"
      },
      {
        title: "操作",
        key: "action",
        width: 120,
        render: a => {
          return (
            <div>
              <span
                style={{ cursor: "pointer", marginRight: "10px" }}
                onClick={() => {
                  $("#print")[0].contentWindow.print();
                }}
              >
                发货
              </span>
              <span
                style={{ cursor: "pointer" }}
                onClick={() => {
                  this.setState({
                    order_id: a.order_id,
                    addEditVisible: true,
                    isAdd: false
                  });
                }}
              >
                滞留
              </span>
            </div>
          );
        }
      }
    ];
    this.setState({
      columns
    });
  }

  getData() {
    let { freight_number } = this.state;
    this.setState({
      loading: true
    });
    setTimeout(() => {
      this.setState({
        storeList: [
          {
            order_id: 1,
            name: "佛像",
            freight_number: freight_number,
            pc_attrice: "--",
            address: "西班牙",
            key: 1
          }
        ],
        freight_number: "",
        loading: false
      });
    }, 500);
  }

  // 操作弹窗
  addEditModal() {
    const {
      modalTitle,
      addEditVisible,

      reason_status,
      noChoice
    } = this.state;
    const menu = (
      <Menu
        onClick={e => {
          this.setState({ reason: e.key });
        }}
      >
        {reason.map((a, b) => {
          return <Menu.Item key={a}>{a}</Menu.Item>;
        })}
      </Menu>
    );
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
              <i>*</i>滞留原因
            </span>
          }
          validateStatus={reason_status}
        >
          <Dropdown overlay={menu}>
            <Button style={{ width: "150px" }}>
              {this.state.reason || "请选择滞留原因"} <Icon type="down" />
            </Button>
          </Dropdown>
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
      reason: "",
      reason_status: ""
    });
  }

  handleModelOk() {
    const { isAdd, reason } = this.state;

    if (!reason) {
      this.setState({
        noChoice: true,
        message: "您还没有选择滞留原因！",
        reason_status: "error"
      });
      window.setTimeout(() => {
        this.setState({
          noChoice: false
        });
      }, 2000);
      return;
    }

    if (isAdd) {
      /*增加按钮*/
    } else {
      /* 操作滞留原因 */
      this.setState({
        addEditVisible: false
      });
    }
  }

  topBar() {
    return (
      <div className="search-title" style={{ minWidth: "1170px" }}>
        {/*关键字*/}
        <div className="params params-20" style={{ minWidth: "170px" }}>
          <span>运单号：</span>
          <Input
            placeholder="请输入运单号"
            className="store_freight"
            value={this.state.freight_number}
            style={{ width: "200px" }}
            onPressEnter={e => {
              this.getData();
            }}
            onChange={e => {
              this.setState({
                freight_number: e.target.value
              });
            }}
          />
        </div>
        {/*订单号*/}
        <div className="params params-20" style={{ minWidth: "170px" }}>
          <span>订单号：</span>
          <Input
            placeholder="请输入订单号"
            value={this.state.order_number}
            style={{ width: "200px" }}
            onChange={e => {
              this.setState({
                order_number: e.target.value
              });
            }}
          />
        </div>
        {/*异常订单abnormal*/}
        <div className="params params-20" style={{ minWidth: "170px" }}>
          <span>异常订单：</span>
          <Select
            value={this.state.abnormal_order || "选择异常原因"}
            style={{ width: 200 }}
            onChange={val => {
              this.setState(
                {
                  abnormal_order: val
                },
                () => {
                  this.getData();
                }
              );
            }}
          >
            {reason.map(a => {
              return (
                <Select.Option value={a} key={a}>
                  {a}
                </Select.Option>
              );
            })}
          </Select>
        </div>

        {/*查询和清空*/}
        <div className="params" style={{ marginRight: "60px" }}>
          <Button
            className="search-btn"
            onClick={() => {
              this.getData();
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
                  freight_number: "",
                  order_number: "",
                  abnormal_order: ""
                },
                () => {
                  this.getData();
                }
              );
            }}
          >
            清空
          </Button>
        </div>
      </div>
    );
  }

  render() {
    return (
      <div className="admin plat">
        <iframe
          src={require("./test2.pdf")}
          id="print"
          style={{ display: "none" }}
          title="123"
          frameBorder="0"
        />
        <div className="tableWarp">
          {this.topBar()}
          <Table
            columns={this.state.columns}
            dataSource={this.state.storeList}
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

export default StoreManage;
