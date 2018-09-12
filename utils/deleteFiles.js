var fs = require('fs');

/**
 * [deleteFiles 删除文件/文件夹]
 * @param  {[string]} deletePath [根据该路径,删除文件或文件夹]
 */
var deleteFiles = (deletePath) => {
  if (!fs.existsSync(deletePath)) {
    console.error('can`t delete because path is invalid')
    return
  }
  let files = []
  // 若路径为文件夹，则根据递归算法，删除路径下的文件／文件夹
  if (fs.statSync(deletePath).isDirectory()) {
    files = fs.readdirSync(deletePath)
    files.forEach(function (file, index) {
      var curPath = deletePath + '/' + file
      if (fs.statSync(curPath).isDirectory()) { // recurse
        deleteFiles(curPath)
      } else { // delete file
        fs.unlinkSync(curPath)
      }
    })
    fs.rmdirSync(deletePath)
    // 若路径为文件，则删除文件
  } else if (fs.statSync(deletePath).isFile()) {
    fs.unlink(deletePath, function (err) {
      if (err) {
        return console.error(err)
      }
      console.log(`文件 ${deletePath} 删除成功！`)
    })
  }
}

module.exports = deleteFiles
