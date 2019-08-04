import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Menu } from 'antd'
import side_admin from '../image/side_admin.svg';
import side_permiss from '../image/side_permiss.svg';
import side_plat from '../image/side_plat.svg';
import side_role from '../image/side_role.svg';

class SideBar extends Component {

    constructor(props) {
        super(props)

        this.state = {
            openKeys: [],
            selectedKey: '',
            checkedMenu:'',
            defKey:''
        }

    }

    componentDidMount() {
        this.setState({
            defKey:this.props.defKey
        })
    }

    componentWillReceiveProps(props) {

    }

    addTabs(name){
        this.props.onTabEdit(name,'add')
    }
    render() {
        return(
            <div className="sideBar">
                <div className="side-title">
                    账号管理系统
                </div>
                <Menu
                    theme='dark'
                    mode="vertical"
                    selectedKeys={[this.state.defKey]}
                >
                    <Menu.Item key='AdminManage'><span
                        onClick={()=>{
                            this.addTabs('AdminManage')
                            this.setState({
                                defKey:'AdminManage'
                            });
                        }}
                    >
                        <img src={side_admin} style={{marginRight:'5px',verticalAlign:'sub'}} alt=""/>
                        用户管理</span></Menu.Item>
                    <Menu.Item key='RoleManage'><span
                        onClick={()=>{
                            this.addTabs('RoleManage')
                            this.setState({
                                defKey:'RoleManage'
                            });
                        }}
                    >
                        <img src={side_role} style={{marginRight:'5px',verticalAlign:'sub'}} alt=""/>
                        角色管理</span></Menu.Item>
                    <Menu.Item key='PowerManage'><span
                        onClick={()=>{
                            this.addTabs('PowerManage')
                            this.setState({
                                defKey:'PowerManage'
                            });
                        }}
                    >
                        <img src={side_permiss} style={{marginRight:'5px',verticalAlign:'sub'}} alt=""/>
                        权限管理</span></Menu.Item>
                    <Menu.Item key='PlatManage'><span
                        onClick={()=>{
                            this.addTabs('PlatManage')
                            this.setState({
                                defKey:'PlatManage'
                            });
                        }}
                    >
                        <img src={side_plat} style={{marginRight:'5px',verticalAlign:'sub'}} alt=""/>
                        平台管理</span></Menu.Item>
                </Menu>
            </div>
        )
    }

}

const mapStateToProps = (state) => {

    const { user } = state.login

    return {
        user
    }
}


export default connect(mapStateToProps)(SideBar)