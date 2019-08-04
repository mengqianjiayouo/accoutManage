import React, {Component} from 'react'
import {Input, Select, Table, Button, Icon, Modal, Form, Col, Checkbox, Radio, Row, Tabs ,Alert} from 'antd';
import {Api} from '../.././common/_ajax.js'
import edit_icon from '../../image/edit.svg'
import look_icon from '../../image/look.svg'
import delete_icon from '../../image/delete.svg'
const TabPane = Tabs.TabPane;
const Option = Select.Option;
const CheckboxGroup = Checkbox.Group;
const FormItem = Form.Item;
const api = new Api();
const formItemLayout = {
    labelCol: {span: 7},
    wrapperCol: {span: 14},
}
class PowerManage extends Component {

    constructor(props) {
        super(props)
        this.state = {
            visible: false,
            platform_id: '',
            permission_id: '',
            platName: '',
            platList: [],
            kw: '',
            PermissList:[],
            loading:false,
            locale:{
                emptyText:'没有相关数据'
            },
            isAdd:true,
            isLook:false,
            permission_name:'',
            permissname_status:'',
            permission_flag:'',
            permissflag_status:'',
            permission_desc:'',
            addEditVisible:false,
            noChoice:false,
            message:'',
            page_size:20,
            page_num:1,
            total_size:0,
        }
    }

    componentWillMount() {

        // api.$get(  '/api/account/platform_list/', null, (res) => {
        //     this.setState({
        //         platList: res,
        //     })
        // });
        this.setColumn();
    }
    componentWillReceiveProps(){
        // api.$get(  '/api/account/platform_list/', null, (res) => {
        //     this.setState({
        //         platList: res,
        //     })
        // });
    }
    getPermissList(){
        const {kw,platform_id,page_num,page_size} = this.state;
        let obj = {};
        obj.platform_id = platform_id;
        obj.page_num = page_num;
        obj.page_size = page_size;
        if (kw){
            obj.kw = kw;
        }
        this.setState({
            loading:true
        })
        // api.$get(  '/api/account/permission_list/',obj,(res)=>{
        //     let data = res.data;
        //     data.map((a,b) => {
        //         a.index = b+'';
        //         a.key = b+''

        //     })
        //     this.setState({
        //         PermissList:data,
        //         loading:false,
        //         total_size:res.total_num
        //     })

        // })
    }
    topBar() {
        return (
            <div className="search-title" style={{minWidth: '1170px'}}>
                {/*平台*/}
                <div className="params params-20" style={{minWidth: '97px'}}>
                    <span>平台：</span>
                    <Select value={this.state.platform_id+''} style={{ width: 200 }} onChange={(val)=>{
                        this.setState({
                            platform_id:val,
                            page_num:1,
                            page_size:20,
                        },()=>{
                            this.getPermissList()
                        })
                    }}>
                        {
                            this.state.platList.map((a)=>{
                                return (
                                    <Option value={a.platform_id+''} key={a.platform_id+''}>
                                        {a.platform_name}
                                    </Option>
                                )
                            })
                        }
                    </Select>
                </div>
                {/*关键字*/}
                <div className="params params-20" style={{minWidth: '170px'}}>
                    <span>关键字：</span>
                    <Input
                        placeholder="请输入权限名称、标识"
                        value={this.state.kw}
                        style={{width: '200px'}}
                        onChange={(e) => {
                            this.setState({
                                kw: e.target.value
                            }, () => this.getPermissList())
                        }}
                    />
                </div>

                {/*查询和清空*/}
                <div className="params" style={{marginRight: '60px'}}>
                    <Button className="search-btn"
                            onClick={() => {
                                this.getPermissList()
                            }}
                    >查询</Button>
                    <Button
                        style={{
                            maxWidth: '60px',
                            backgroundcolor: '#fff',
                            borderColor: '#d9d9d9',
                            color: '#222',
                            marginLeft: '12px'
                        }}
                        onClick={()=> {
                            this.setState({
                                kw: '',
                            }, ()=> this.getPermissList())
                        }}
                    >清空</Button>
                </div>
            </div>
        )
    }
    setColumn(){
        const {formData} = this.state;
        const columns = [{
            title: '序号',
            dataIndex: 'index',
            key: 'index',
            width: 60
        }, {
            title: '操作',
            key: 'action',
            width: 118,
            render:(a)=>{
                return (
                    <div>
                        <img src={edit_icon} className="role_action" alt=""
                             onClick={()=>{
                                 this.getPermissDetail(a.permission_id)
                                 this.setState({
                                     permission_id:a.permission_id,
                                     modalTitle:'权限编辑',
                                 })
                             }}
                        />
                        <img src={delete_icon} className="role_action" alt=""
                             onClick={()=>{
                                 Modal.confirm({
                                     title:'确定要删除该权限？',
                                     okText: '确定',
                                     cancelText: '取消',
                                     onOk:()=>{
                                         this.deletePermiss(a.permission_id)
                                     }
                                 })
                             }}
                        />
                        <img src={look_icon} className="role_action" alt=""
                             onClick={()=>{
                                 this.getPermissDetail(a.permission_id)
                                 this.setState({
                                     permission_id:a.permission_id,
                                     modalTitle:'权限查看',
                                     isLook:true
                                 })
                             }}
                        />
                    </div>
                )
            }
        }, {
            title: '权限名称',
            dataIndex: 'permission_name',
            key: 'permission_name',
        }, {
            title: '标识',
            dataIndex: 'permission_flag',
            key: 'permission_flag',
        }, {
            title: '备注',
            dataIndex: 'permission_desc',
            key: 'permission_desc',
        }
        ];
        this.setState({
            columns
        })
    }
    getPermissDetail(permission_id){
        // api.$get(  '/api/account/permission_detail/',{permission_id},res=>{
        //     this.setState({
        //         addEditVisible:true,
        //         isAdd:false,
        //         permission_flag:res.permission_flag,
        //         permission_name:res.permission_name,
        //         permission_desc:res.permission_desc,
        //     })
        // })

    }
    // 编辑和添加
    addEditModal(){
        const {modalTitle,addEditVisible,permission_name,permission_flag,permission_desc,permissflag_status,permissname_status,noChoice} = this.state;
        return (
            <Modal
                title={modalTitle}
                wrapClassName="admin_modal column"
                width={'520px'}
                visible={addEditVisible}
                onCancel={this.clearForm.bind(this)}
                footer={<div className="action">
                    <Button style={{backgroundColor:'transparent'}} onClick={this.clearForm.bind(this)}>关闭</Button>
                    {this.state.isLook?null:(
                        <Button className=" add_btn"  onClick={this.handleModelOk.bind(this)}>保存</Button>
                    )}

                </div>}>
                <FormItem {...formItemLayout} label={<span><i>*</i>权限名称</span>} validateStatus={permissname_status}>
                    <Input placeholder="请输入权限名称"
                           className="input"
                           disabled={this.state.isLook}
                           value={permission_name}
                           onChange={(e) => {
                               this.setState({
                                   permission_name: e.target.value
                               })
                           }}
                    />
                </FormItem>

                <FormItem {...formItemLayout} label={<span><i>*</i>权限标识</span>} validateStatus={permissflag_status}>
                    <Input placeholder="2-12个英文字母"
                           className="input"
                           value={permission_flag}
                           disabled={this.state.isLook}
                           onChange={(e) => {
                               this.setState({
                                   permission_flag: e.target.value
                               })
                           }}
                    />
                </FormItem>
                <FormItem {...formItemLayout} label="备注" >
                    <Input placeholder=""
                           className="input"
                           value={permission_desc}
                           disabled={this.state.isLook}
                           onChange={(e) => {
                               this.setState({
                                   permission_desc: e.target.value
                               })
                           }}
                    />
                </FormItem>
                {noChoice?(
                    <Alert
                        message={this.state.message}
                        type="error"
                        closable
                        showIcon={true}
                        // onClose={onClose}
                    />
                ):null}
            </Modal>
        )
    }

    clearForm(){
        this.setState({
            addEditVisible: false,
            permission_name:'',
            permissname_status:'',
            permission_flag:'',
            permissflag_status:'',
            permission_desc:'',
            isLook:false,
        })
    }
    handleModelOk(){
        const {isAdd,permission_flag,permission_name,platform_id,permission_id,permission_desc} = this.state;

        if (!permission_name){
            this.setState({
                noChoice:true,
                message:'您还没有输入权限名称！',
                permissname_status:'error'
            })
            window.setTimeout(()=>{
                this.setState({
                    noChoice:false,
                })
            },5000)
            return
        }
        if (!permission_flag){
            this.setState({
                noChoice:true,
                message:'您还没有输入权限标识！',
                permissflag_status:'error'
            })
            window.setTimeout(()=>{
                this.setState({
                    noChoice:false,
                })
            },5000)
            return
        }
        if (isAdd){
            /*创建新权限*/
          /*   api.$post(  '/api/account/create_permission/',{platform_id,permission_name,permission_flag,permission_desc},(res)=>{
                if (!res.errmsg){
                    this.setState({
                        addEditVisible:false
                    })
                    Modal.success({
                        title:'提示',
                        content:'权限创建成功！',
                        onOk:()=>{
                            this.getPermissList()
                            this.clearForm()
                        }
                    })
                }else{
                    this.setState({
                        noChoice:true,
                        message:res.errmsg
                    })
                    window.setTimeout(()=>{
                        this.setState({
                            noChoice:false,
                        })
                    },5000)
                }
            }) */
        }else{
           /*  api.$post(  '/api/account/permission_detail/',{platform_id,permission_name,permission_flag,permission_id,permission_desc},(res)=>{
                if (!res.errmsg){
                    this.setState({
                        addEditVisible:false
                    })
                    Modal.success({
                        title:'提示',
                        content:'权限修改成功！',
                        onOk:()=>{
                            this.getPermissList()
                            this.clearForm()
                        }
                    })
                }else{
                    this.setState({
                        noChoice:true,
                        message:res.errmsg
                    })
                    window.setTimeout(()=>{
                        this.setState({
                            noChoice:false,
                        })
                    },5000)
                }
            }) */
        }
    }
    deletePermiss(id){
       /*  api.$post(  '/api/account/delete_permission/',{permission_id:id},()=>{
            this.getPermissList()
        }) */
    }
    render() {
        return (
            <div className="power">
                {
                    !this.state.visible ? (
                        <div>
                            {this.topBar()}
                            <div className="tableWarp">
                                <Table
                                    columns={this.state.columns}
                                    dataSource={this.state.PermissList}
                                    bordered
                                    loading={this.state.loading}
                                    locale = {this.state.locale}
                                    pagination={{
                                        current:this.state.page_num,
                                        pageSize:this.state.page_size,
                                        showQuickJumper:true,
                                        showSizeChanger:true,
                                        onChange:(page)=>{
                                            this.setState({
                                                page_num:page,
                                            },()=>{this.getPermissList()})
                                        },
                                        onShowSizeChange:(current,size)=>{
                                            this.setState({
                                                page_size:size,
                                            },()=>{this.getPermissList()})
                                        },
                                        total:this.state.total_size
                                    }}
                                />
                            </div>
                            {this.addEditModal()}
                            <Button className="add_btn"
                                    onClick={()=>{
                                        this.setState({
                                            addEditVisible:true,
                                            modalTitle:'权限新增',
                                            isAdd:true,
                                        })
                                    }}
                            >
                                <Icon type="plus" />
                                新增
                            </Button>
                        </div>
                    ) : (
                        <div className="modalWarp">
                            <div className="chooseModal">
                                {
                                    this.state.platList.length>0?this.state.platList.map((a, b) => {
                                        return (
                                            <div key={b + ''}
                                                 style={{
                                                     width: '280px',
                                                     height: '38px',
                                                     lineHeight: '38px',
                                                     margin: '0 auto 20px',
                                                     borderRadius: '4px',
                                                     textAlign: 'center',
                                                     backgroundColor: '#16b8be',
                                                     color: '#fff',
                                                     cursor: 'pointer'
                                                 }}
                                                 onClick={() => {
                                                     this.setState({
                                                         visible: false,
                                                         platName: a.platform_name,
                                                         platform_id: a.platform_id,
                                                     }, () => {
                                                         this.getPermissList()
                                                     })
                                                 }}
                                            >{a.platform_name}</div>
                                        )
                                    }):(
                                        <div style={{textAlign:'center'}}>
                                            请先创建平台！
                                        </div>
                                    )
                                }
                            </div>
                        </div>

                    )
                }
            </div>
        )
    }

}

export default PowerManage
