export const LOGIN = 'LOGIN';
export const SEARCH = 'SEARCH';
export const ADD = 'ADD';
export const REMOVE = 'REMOVE';
export const OTHER = 'OTHER';
export const REMOVEALL = 'REMOVEALL';
export const UPDATECURRENTLIST = 'UPDATECURRENTLIST';
export const ADDACTIVEKEY = 'ADDACTIVEKEY';
export const login = (user) => {

    return { type: LOGIN, user }
};
export const search = (result) => {

    return { type: SEARCH, result }
};
export const add = (name) => {

    return { type: ADD, name }

};
export const remove = (name) => {

    return { type: REMOVE, name }

};
export const other = (name) => {

    return { type: OTHER, name }

};
export const removeall = (name) => {

    return { type: REMOVEALL, name }

};

export const addActiveKey = (key) =>{
    return {type: ADDACTIVEKEY, key}
};
