const initArgvs = ()=>{
  const argvs = process.argv.splice(2)
  let retArgvs = {}
  for(let a of argvs){
    let s = a.split("=")
    if(s!==null && s.length==2){
      retArgvs[s[0]] = s[1]
    }
  }
  return retArgvs
}

//获取在打包时输入的参数，并分割成json形式
module.exports = {
  'nodeArgvs':initArgvs()
}
