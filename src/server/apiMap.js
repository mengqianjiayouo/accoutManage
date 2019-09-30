const serverPath = "http://47.94.223.5:8005";

const apiList = {
  login: {
    path: serverPath + "/token"
  },
  memberList: {
    path: serverPath + "/api/member/pagedlist"
  },
  createMember: {
    path: serverPath + "/api/member/create"
  },
  updateMember: {
    path: serverPath + "/api/member/update"
  },
  deleteMember: {
    path: serverPath + "/api/member/delete"
  },
  changeAccount: {
    path: serverPath + "/api/memberAccount/change"
  }
};

export { apiList };
