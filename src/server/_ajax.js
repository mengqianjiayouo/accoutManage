// import React from 'react'
// import {HashRouter as Router, Route, Redirect} from 'react-router'
import createHistory from "history/createBrowserHistory";
import { Modal } from "antd";
import $ from "jquery";
import { getCookie, clearCookie } from "./cookies";
const history = createHistory({
  forceRefresh: true
});

class Api {
  constructor() {
    this._locks = {};
  }

  $get(url, data, success, error) {
    return this.$ajax("GET", url, data, success, error);
  }

  $post(url, data, success, error) {
    return this.$ajax("POST", url, data, success, error);
  }

  $delete(url, data, success, error) {
    return this.$ajax("DELETE", url, data, success, error);
  }

  $ajax(method, url, data, success, error) {
    let _this = this;

    this._locks[url] = 1;
    let authorization = getCookie("authorization"),
      apiKey = getCookie("ApiKey"),
      token_type = getCookie("token_type") || "bearer";
    return $.ajax({
      type: method,
      url: url,
      data: data,
      dataType: "json",
      beforeSend: function(xhr) {
        xhr.withCredentials = true;
        if (authorization && authorization !== "") {
          xhr.setRequestHeader("Authorize", token_type + " " + authorization);
        }
        if (apiKey && apiKey !== "") {
          xhr.setRequestHeader("ApiKey", apiKey);
        }
      },
      crossDomain: true,
      success: function(resp /* status*/ /*, xhr*/) {
        delete _this._locks[url];

        resp = resp ? resp : {};

        if (resp.errnum == -1) {
          return history.replace("/login");
        }
        if (resp.errnum == 10103) return history.replace("/login");

        if (resp.errmsg) return _this.ajaxError(resp.errmsg, error);

        success && success((resp.data && resp.data) || resp);
      },
      error: function(xhr, status, err) {
        if (status == "abort") return;
        if (xhr.status === 401) {
          delete _this._locks[url];
          _this.ajaxError("登录过期，请重新登录！", error, true);
        }
        console.log(xhr);
        delete _this._locks[url];
        _this.ajaxError(null, error);
      }
    });
  }

  ajaxError(str, error, isLogin) {
    if (str) {
      Modal.warning({
        title: "提示",
        content: str || "网络出错了，请刷新后重试!!",
        onOk: () => {
          if (isLogin) {
            clearCookie("authorization");
            clearCookie("ApiKey");
            clearCookie("token_type");
            history.push("/login");
          }
        }
      });
    }
    return error && error();
  }
}

export { Api };
