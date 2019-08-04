
// 环境host
export const EASYSHOP_DEV_HOST = 'http://account.dev2.youmiyou.cn'
export const EASYSHOP_TEST_HOST = 'http://ydaccounttest.ds365.com/'
export const EASYSHOP_ONLINE_HOST = '//account.huikaixin.cn'

// easyshop host
let EASYSHOP_HOST

if(process.env.NODE_ENV == 'development') {

    EASYSHOP_HOST = EASYSHOP_DEV_HOST

} else if (process.env.NODE_ENV == 'test') {

    EASYSHOP_HOST = EASYSHOP_TEST_HOST

} else {

    EASYSHOP_HOST = EASYSHOP_ONLINE_HOST

}

export { EASYSHOP_HOST }