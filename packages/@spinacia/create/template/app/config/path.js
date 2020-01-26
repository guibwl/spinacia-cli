import {wrapServer} from "../utils/wrapUrl"

//以下路径在开发时请注释

export default wrapServer({
    "ncd": {//自动添加前缀/city/ncdmain
        PATH_BASE_INFO:'/patient/sign2/v2/getBaseInfo',
    },
    "custom": {//不做任何处理
        PATH_WX_TICKET:"/city/member/wechat/makeWXTicket"
    }
})


