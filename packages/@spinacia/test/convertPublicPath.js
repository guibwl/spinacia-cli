const fs = require('fs');
const path = require('path');

const cwd = fs.realpathSync(process.cwd());
const lcovFnfoPath = path.join(cwd, 'coverage', 'istanbul', 'lcov.info');
const lcovFnfoPath2 = path.join(cwd, 'coverage', 'istanbul', 'lcov2.info');

const files = fs.readFileSync(lcovFnfoPath, 'utf-8').toString();

const newFiles = files.replace(new RegExp(path.dirname(cwd), 'g'), '/home/jenkins/workspace/health-app_health-static-repo')

console.log(
  newFiles.match(/^\nSF(.*)\.js\n$/)
);


fs.writeFileSync(lcovFnfoPath, newFiles);
