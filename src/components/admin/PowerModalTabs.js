import React, {Component} from 'react'
import {Input, Select, Table, Button, Icon, Modal, Form, Col, Checkbox, Radio, Row, Tabs} from 'antd';
import {Api} from '../.././common/_ajax.js'
const TabPane = Tabs.TabPane;
const CheckboxGroup = Checkbox.Group;
const api = new Api();
class PowerModalTabs extends Component {

    constructor(props) {
        super(props)
        this.state = {
            options1: [],
            planOptions2: [],
            powerModalIndeterminate1: true,
            powerModalIndeterminate2: true,
            powerModalCheckAll1: false,
            powerModalCheckAll2: false,
            powerModalCheckedList1: [],
            powerModalCheckedList2: [],
            powerModalCheckedListDef2: [],
            selfChecked:[],
            checkAllList1:[],
            checkAllList2:[],
            idflag:''
        }
    }

    componentDidMount() {
        /*数组去重方法*/
        Array.prototype.distinct = function(){
            var arr = this,
                result = [],
                i,
                j,
                len = arr.length;
            for(i = 0; i < len; i++){
                for(j = i + 1; j < len; j++){
                    if(arr[i] === arr[j]){
                        j = ++i;
                    }
                }
                result.push(arr[i]);
            }
            return result;
        }
        this.getUserRole();
        this.getRolePerList()
    }
    componentWillReceiveProps(props){
        if (props.active != this.state.idflag){
            this.getRolePerList()
        }
        this.setState({
            idflag:props.active
        })

    }
    getUserRole(){
        let {powerModalCheckedList1} = this.state;
       /*  api.$get(  '/api/account/user_role/', {
            user_id: this.props.user_id,
            platform_id: this.props.id
        }, res => {
            res.roles && res.roles.map((a)=>{
                powerModalCheckedList1.push(a.role_id+'')
            })
            this.setState({
                powerModalCheckedList1,
            },()=>{
                this.props.changeRoleList(this.state.powerModalCheckedList1.join(','));
                this.props.changePlatId(this.props.id);
                this.changeOptions1()
            });
        }) */
    }
    getUserPer(){
       /*  api.$get(  '/api/account/user_permission/', {
            user_id: this.props.user_id,
            platform_id: this.props.id
        }, res => {
            let ary = [],ary2=[];
            res.sole_permissions && res.sole_permissions.map(a=>{
                ary2.push(a.permission_id +'')
            })
            res.role_permissions && res.role_permissions.map(a=>{
                ary.push(a.permission_id +'')
            })
            this.setState({
                powerModalCheckedList2:ary2.concat(ary).distinct(),
                selfChecked:ary2,
                powerModalCheckedListDef2:ary
            },()=>{
                this.props.changePermissionList(this.state.powerModalCheckedList2.join(','));
                this.changeOption2()
            });
        }) */
    }
    getRolePerList(){

        /*获取当前平台全部角色*/
        this.getRoleList();
        /*获取当前平台全部权限*/
        this.getPermissList();
    }
    getRoleList(){
        // let {options1,checkAllList1} = this.state;
        let ary = [],ary2=[];
        /*获取当前平台全部角色*/
      /*   api.$get(  '/api/account/role_list/', {platform_id: this.props.id}, res => {
            let data = res.data;

            data.map((a) => {
                let obj = {};
                obj.label = a.role_name;
                obj.value = a.role_id + '';
                ary.push(obj);
                ary2.push(a.role_id + '');
            })
            this.setState({
                options1:ary,
                checkAllList1:ary2,
            },()=>this.changeOptions1())
        }); */
    }
    getPermissList(){
        let ary = [],ary2=[];
       /*  api.$get(  '/api/account/permission_list/', {platform_id: this.props.id}, res => {
            let data = res.data;
            data.map((a,b) => {
                let obj = {};
                obj.label = a.permission_name;
                obj.value = a.permission_id + '';
                ary.push(obj);
                ary2.push(a.permission_id + '');

            })
            this.setState({
                planOptions2:ary,
                checkAllList2:ary2
            },()=>this.changeOption2())
        }); */
    }
    changeRole(){
        let {powerModalCheckedList1} = this.state;
        let role_ids = powerModalCheckedList1.join(',')
        let obj = {
            user_id:this.props.user_id,
            platform_id:this.props.id,
            role_ids:role_ids
        }
        // api.$post(  '/api/account/user_role/',obj,res=>{})
    }
    changePer(){
        let {powerModalCheckedList2} = this.state;
        let permission_ids = powerModalCheckedList2.join(',')
        let obj = {
            user_id:this.props.user_id,
            platform_id:this.props.id,
            permission_ids:permission_ids
        }
        // api.$post(  '/api/account/user_permission/',obj,res=>{})
    }
    changeOptions1(){
        let {options1,powerModalCheckedList1} = this.state;

        options1.map((a)=>{
            a.checked = false;
            powerModalCheckedList1.map((b)=>{
                if(b == a.value){
                    a.checked = true
                }
            })
        })

        this.setState({
            options1,
            powerModalCheckAll1:powerModalCheckedList1.length == options1.length
        })
    }
    changeOption2(){
        let {planOptions2,powerModalCheckedListDef2,powerModalCheckedList2} = this.state;
        planOptions2.map((a)=>{
            a.disabled = false;
            a.checked = false;
            powerModalCheckedList2.map((c)=>{
                if(a.value == c){
                    a.checked = true;
                }
            })
            powerModalCheckedListDef2.map(b=>{
                if(a.value == b){
                    a.disabled = true
                    a.checked = true;
                }
            })

        })
        this.setState({
            planOptions2,
            powerModalCheckAll2:powerModalCheckedList2.length == planOptions2.length
        });
    }
    render() {
        const {options1, planOptions2} = this.state;

        return (
            <Tabs defaultActiveKey="1"
                  type="card"
                  tabBarGutter="0"
                  onChange={(key) => {
                      if(key == '2'){
                          this.getUserPer();
                      }
            }}>
                <TabPane tab="角色" key="1">
                    <div style={{marginBottom:'6px'}}>
                        <Checkbox
                            onChange={(e) => {
                                this.setState({
                                    powerModalCheckedList1: e.target.checked ? this.state.checkAllList1 : [],
                                    powerModalCheckAll1: e.target.checked,
                                },()=>{
                                    this.props.changeRoleList(this.state.powerModalCheckedList1.join(','))
                                    this.changeOptions1()
                                    this.changeRole()
                                });
                            }}
                            checked={this.state.powerModalCheckAll1}
                        >
                            全选
                        </Checkbox>
                    </div>
                    {
                        options1.map((a,b)=>{
                            return (
                                <Checkbox value={a.vlaue} key={b+''}
                                          checked={a.checked}
                                          onChange={(e)=>{
                                              let flag = e.target.checked;
                                              const {powerModalCheckedList1} = this.state;
                                              let ary = [];
                                              powerModalCheckedList1.map(a=>{
                                                  ary.push(a)
                                              })
                                              if(flag){
                                                  ary.push(a.value)
                                              }else{
                                                  ary = ary.filter(b=>{
                                                      return b != a.value;
                                                  })
                                              }
                                              this.setState({
                                                  powerModalCheckedList1:ary,
                                                  powerModalCheckAll1: ary.length === options1.length,
                                                  // Indeterminate1: !!ary.length && (ary.length < options1.length),
                                              },()=>{
                                                  this.props.changeRoleList(this.state.powerModalCheckedList1.join(','))
                                                  this.changeOptions1();
                                                  this.changeRole()
                                              })
                                          }}
                                >
                                    {a.label}
                                </Checkbox>
                            )
                        })
                    }
                </TabPane>
                <TabPane tab={"权限("+this.state.powerModalCheckedList2.length +")"} key="2">
                    <div  style={{marginBottom:'6px'}}>
                        <Checkbox
                            // indeterminate={this.state.powerModalIndeterminate2}
                            onChange={(e) => {
                                this.setState({
                                    powerModalCheckedList2: e.target.checked ? this.state.checkAllList2 : this.state.powerModalCheckedListDef2,
                                    selfChecked: e.target.checked ? this.state.checkAllList2 : [],
                                    // powerModalIndeterminate2: false,
                                    powerModalCheckAll2: e.target.checked,
                                },()=>{
                                    this.changeOption2()
                                    this.changePer()
                                    this.props.changePermissionList(this.state.powerModalCheckedList2.join(','))
                                });
                            }}
                            checked={this.state.powerModalCheckAll2}
                            disabled={this.state.powerModalCheckedListDef2.length == this.state.planOptions2.length}
                        >
                            全选
                        </Checkbox>
                    </div>
                    {
                        planOptions2.map((a,b)=>{
                            return (
                                <Checkbox value={a.vlaue} key={b+''}
                                          checked={a.checked}
                                          disabled={a.disabled}
                                          onChange={(e)=>{
                                              let flag = e.target.checked;
                                              let {selfChecked} = this.state;
                                              if(flag){
                                                  selfChecked.push(a.value)
                                              }else{
                                                  selfChecked = selfChecked.filter(b=>{
                                                      return b != a.value;
                                                  })
                                              }

                                              let ary1= this.state.powerModalCheckedListDef2
                                              let ary = ary1.concat(selfChecked).distinct()

                                              this.setState({
                                                  selfChecked,
                                                  powerModalCheckedList2:ary,
                                                  powerModalCheckAll2:ary.length == planOptions2.length,
                                                  // powerModalIndeterminate2:!!ary.length && (ary.length < planOptions2s.length),
                                              },()=>{
                                                  this.props.changePermissionList(ary.join(','))
                                                  this.changeOption2()
                                                  this.changePer()
                                              })
                                          }}
                                >
                                    {a.label}
                                </Checkbox>
                            )
                        })
                    }
                </TabPane>
            </Tabs>
        )
    }

}

export default PowerModalTabs
