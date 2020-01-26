export const getQueryObj = function (location) {
    if (location.query != null && location.query != {}) {
        return location.query;
    } else if (location.search != null && location.search != "") {
        return queryObj(location.search);
    } else if (location.params != null) {
        return location.params
    } else {
        return {}
    }
}

function queryObj(search) {
    let searchParam = search.replace("?", "");
    let obj = {};
    if (searchParam !== null) {
        let queryParam = searchParam.split("&")
        for (let i = 0; i < queryParam.length; ++i) {
            let str = queryParam[i];
            if (str !== null && str.indexOf("=") > 0) {
                let p = str.split("=");
                obj[p[0]] = decodeURI(p[1]);
            }
        }
    }
    console.log("queryObj obj:", obj);
    return obj
}


export const getStringify = function (params) {
    let ret = null;
    if (params !== null) {
        ret = "?";
        for (let p in params) {
            if (ret.length !== 1) {
                ret += "&";
            }
            ret += p + "=" + encodeURI(params[p]);
        }
    }
    return ret;
}

