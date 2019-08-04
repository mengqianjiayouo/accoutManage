import React from "react";
import logo from "./logo.svg";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
// import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import createHistory from "history/createBrowserHistory";
import pageApp from "./components/App";
import Login from "./components/Login";
import "./App.css";
const history = createHistory({
  basename: "/"
});
function App() {
  return (
    <div className="App">
      <Router history={history}>
        <Switch>
          <Route exact path="/" component={pageApp} />
          <Route exact path="/login" component={Login} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
