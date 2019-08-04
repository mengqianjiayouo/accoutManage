import { combineReducers } from "redux";
import {
  LOGIN,
  ADD,
  REMOVE,
  REMOVEALL,
  OTHER,
  SEARCH,
  ADDACTIVEKEY
} from "./actions";

const login = (state = {}, action) => {
  switch (action.type) {
    case LOGIN:
      return Object.assign(
        {},
        {
          user: action.user.user_name
        }
      );

    default:
      return state;
  }
};
const search = (state = {}, action) => {
  switch (action.type) {
    case SEARCH:
      return Object.assign({}, action.result);

    default:
      return state;
  }
};
const tabs = (state = ["AdminManage"], action) => {
  switch (action.type) {
    case ADD:
      var flag = false;
      var ary = [...state];
      state.map(a => {
        if (a == action.name) {
          flag = true;
        }
      });
      if (!flag) {
        ary.push(action.name);
      }
      return ary;
    case REMOVE:
      return state.filter(item => item !== action.name);

    case OTHER:
      var flag = false;
      var ary = [];
      ary.map(a => {
        if (a == action.name) {
          flag = true;
        }
      });
      if (!flag) {
        ary.push(action.name);
      }
      return ary;

    case REMOVEALL:
      return [];
    default:
      return state;
  }
};

const addActiveKey = (state = "AdminManage", action) => {
  console.log(action);
  switch (action.type) {
    case ADDACTIVEKEY:
      return action.key;
    default:
      return state;
  }
};

const AccountReducer = combineReducers({
  login,
  tabs,
  search,
  addActiveKey
});

export default AccountReducer;
