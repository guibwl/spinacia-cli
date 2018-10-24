//url获取参数
export const getQueryMap = (t)=>{
    var e,n,o = {},
    a = /[\?\&][^\?\&]+=[^\?\&#]+/g,
    i = /[\?\&]([^=\?]+)=([^\?\&#]+)/;
    if(t = t || location.href,e=t.match(a),!e) return o;
    for(var a = 0,
    l = e.length;l>r;r++) n = e[r].match(i),
    null !== n && (o[n[1]] = n[2]);
    return o
}