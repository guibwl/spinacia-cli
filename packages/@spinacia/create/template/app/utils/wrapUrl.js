
/*eslint-disable no-undef*/
const nodeArgvs = node_argvs
/*eslint-enable no-undef*/
const NCD_SERVER_KEY = "ncdserver"

const checkPrefixSlash = (path)=>{//确保路径以斜杠开头
    if( typeof path === "string" && !path.startsWith("/")){
        return "/" + path
    }
    return path

}

const wrapServerPrefix = (server)=>{
    return "/city" + checkPrefixSlash(server)
}

const wrapNcdServer = (path)=>{
    let ncdServer = nodeArgvs && nodeArgvs.hasOwnProperty(NCD_SERVER_KEY) ? nodeArgvs[NCD_SERVER_KEY] : "/ncdmain"
    return wrapServerPrefix(ncdServer) + checkPrefixSlash(path)
}


export const wrapServer = (servers)=>{
    let retUrl = {}
    //确保在第一个
    if(servers.hasOwnProperty("custom")){
        retUrl = {
            ...servers.custom
        }
    }
    //家医
    if(servers.hasOwnProperty("ncd")){
        let {ncd} = servers
        for( let key in ncd){
            retUrl[key] = wrapNcdServer(ncd[key])
        }
    }
    return retUrl
}


