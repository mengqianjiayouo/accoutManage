import React from "react";
import logo from "./logo.svg";
// import { HashRouter as Router, Switch, Route } from "react-router-dom";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Layout } from "antd";

import createHistory from "history/createBrowserHistory";
// import createHistory from "history/createHashHistory";
import pageApp from "./components/App";
import Login from "./components/Login";
import "./App.css";
import AdminManage from "./components/admin/AdminManage";
import SideBar from "./components/SideBar";
import PageHeader from "./components/Header";
import AgentManage from "./components/agent/AgentManage";
import RoleManage from "./components/role/RoleManage";
import PowerManage from "./components/power/PowerManage";
import MessageCreate from "./components/messageControl/MessageCreate";
import UserProductManage from "./components/products/UserProductManage";
import PlatProductManage from "./components/products/PlatProductManage";
import OrderManage from "./components/order/OrderManage";
import StoreManage from "./components/store/StoreManage";
import ContractorManage from "./components/contractor/ContractorManage";
import FactoryManage from "./components/factory/FactoryManage";
import MessageCenter from "./components/messageControl/MessageCenter";
import BannerEdit from "./components/messageControl/BannerEdit";
import YijianManage from "./components/yijianManage/index";
const { Header, Sider, Content } = Layout;

const history = createHistory({
  basename: "/"
});
function App() {
  return (
    <div className="App" style={{ minWidth: "1200px" }}>
      <Router history={history}>
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route
            path="/"
            render={() => {
              return (
                <div>
                  <Layout style={{ height: "100%", minHeight: "800px" }}>
                    <Sider
                      className="menu1"
                      width="180"
                      style={{
                        background:
                          "linear-gradient(-180deg, #262a41 0%, #475071 100%)",
                        height: "100%",
                        minHeight: "800px"
                      }}
                    >
                      <Route path="/" component={SideBar}></Route>
                    </Sider>
                    <Layout>
                      <Header>
                        <Route path="/" component={PageHeader}></Route>
                      </Header>
                      <Content className="content">
                        <Route
                          exact
                          path="/"
                          render={() => "欢迎使用管理平台"}
                        />
                        <Route
                          exact
                          path="/adminManage"
                          component={AdminManage}
                        />
                        <Route
                          exact
                          path="/agentManage"
                          component={AgentManage}
                        />
                        <Route
                          exact
                          path="/roleManage"
                          component={RoleManage}
                        />
                        <Route
                          exact
                          path="/powerManage"
                          component={PowerManage}
                        />
                        <Route
                          exact
                          path="/messageManage"
                          component={MessageCenter}
                        />
                        <Route
                          path="/messageCreate"
                          component={MessageCreate}
                        />
                        <Route path="/bannerEdit" component={BannerEdit} />
                        <Route
                          exact
                          path="/userProductManage"
                          component={UserProductManage}
                        />
                        <Route
                          exact
                          path="/platProductManage"
                          component={PlatProductManage}
                        />
                        <Route
                          exact
                          path="/orderManage"
                          component={OrderManage}
                        />
                        <Route
                          exact
                          path="/storeManage"
                          component={StoreManage}
                        />
                        <Route
                          exact
                          path="/contractorManage"
                          component={ContractorManage}
                        />
                        <Route
                          exact
                          path="/factoryManage"
                          component={FactoryManage}
                        />
                        <Route
                          exact
                          path="/yijianManage"
                          component={YijianManage}
                        />
                      </Content>
                    </Layout>
                  </Layout>
                </div>
              );
            }}
          ></Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
