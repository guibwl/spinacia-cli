
const fs = require('fs');
const path = require('path');
const karma = require('karma');




module.exports = function spinaciaTestInit(params) {

  const config = karma.config;
  const Server = karma.Server;

  // Read karma.conf.js, but override port with 1337
  const karmaConfig = config.parseConfig(path.resolve(__dirname, './karma.conf.js'));


  // init karma server
  const server = new Server(karmaConfig, function(exitCode) {
    // console.log('Karma has exited with ' + exitCode)
    require('./convertPublicPath');
    process.exit(exitCode);
  })

  createQueryConfig();
  // starting karma server
  server.start();

};

function createQueryConfig() {

  const cwd = process.cwd();

  const filePath = path.resolve(__dirname, './queryConfig.json');

  if (fs.existsSync(filePath)) {
    const queryConfig = require(filePath);

    if (queryConfig.cwd !== cwd) {
      writeJson(filePath, {cwd: cwd});
    }

  } else {

    writeJson(filePath, {cwd: cwd});
  }

}

function writeJson (filePath, data) {

  fs.writeFileSync(filePath, JSON.stringify(data), 'utf8');
}

