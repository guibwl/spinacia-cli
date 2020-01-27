#!/usr/bin/env node
/**
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const fs = require('fs');
const path = require('path');
const cp = require('child_process');

const cleanup = () => {
  console.log('Cleaning up.');
  // Reset changes made to package.json files.
  // cp.execSync(`git checkout -- packages/*/package.json`);
  // Uncomment when snapshot testing is enabled by default:
  // rm ./template/src/__snapshots__/App.test.js.snap
};

const handleExit = () => {
  cleanup();
  console.log('Exiting without error.');
  process.exit();
};

const handleError = e => {
  console.error('ERROR! An error was encountered while executing');
  console.error(e);
  cleanup();
  console.log('Exiting with error.');
  process.exit(1);
};

process.on('SIGINT', handleExit);
process.on('uncaughtException', handleError);

// Temporarily overwrite package.json of all packages in monorepo
// to point to each other using absolute file:/ URLs.

// const gitStatus = cp.execSync(`git status --porcelain`).toString();

// if (gitStatus.trim() !== '') {
//   console.log('Please commit your changes before running this script!');
//   console.log('Exiting because `git status` is not empty:');
//   console.log();
//   console.log(gitStatus);
//   console.log();
//   process.exit(1);
// }

const rootDir = path.join(__dirname, '..');
const packagesDir = path.join(rootDir, 'packages', '@spinacia');
const packageVersionByName = {};
const packagePathsByName = {};
const packageTgzPathsByName = {};
// 将packages文件夹中有 package.json 的包存储到 packagePathsByName 中
// packagePathsByName 的 key 为 packages 里面的文件夹名称，对应 value 是其对应的 path
fs.readdirSync(packagesDir).forEach(name => {
  const packageDirPath = path.join(packagesDir, name);
  const packageJsonPath = path.join(packageDirPath, 'package.json');
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
  
  if (fs.existsSync(packageJsonPath)) {
  
    packageTgzPathsByName[`@spinacia/${name}`] =
        path.join(packageDirPath, `${packageJson.name.replace(/@/, '').replace(/\//, '-')}-${packageJson.version}.tgz`);
    packageVersionByName[`@spinacia/${name}`] = packageJson.version;
    packagePathsByName[`@spinacia/${name}`] = packageDirPath;
  }
});

// 修改
// 获取每个 packages 里面的 package.json 内容
Object.keys(packagePathsByName).forEach((name, i, pkgsName) => {
  const packageJson = path.join(packagePathsByName[name], 'package.json');
  const json = JSON.parse(fs.readFileSync(packageJson, 'utf8'));
  
  // 用 package.json 内容对比每个 packages 的 name
  pkgsName.forEach(otherName => {
    if (json.dependencies && json.dependencies[otherName]) {
      json.dependencies[otherName] = "file:" + packageTgzPathsByName[otherName];
    }
    if (json.devDependencies && json.devDependencies[otherName]) {
      json.devDependencies[otherName] = "file:" + packageTgzPathsByName[otherName];
    }
    if (json.peerDependencies && json.peerDependencies[otherName]) {
      json.peerDependencies[otherName] =
        "file:" + packageTgzPathsByName[otherName];
    }
    if (json.optionalDependencies && json.optionalDependencies[otherName]) {
      json.optionalDependencies[otherName] =
        "file:" + packageTgzPathsByName[otherName];
    }
  });

  fs.writeFileSync(packageJson, JSON.stringify(json, null, 2), 'utf8');
  console.log(
    'Replaced local dependencies in packages/' + name + '/package.json'
  );


  cp.execSync(`cd ${packagePathsByName[name]} && npm pack`, {cwd: rootDir});
});

console.log('Replaced all local dependencies for testing.');
console.log('Do not edit any package.json while this task is running.');

// Now that we have packed them, call the global CLI.
const args = process.argv.slice(2);

// Now run the spinacia-cli command
const spinaciaCliScriptPath = path.join(packagesDir, 'create', 'bin', 'create.js');
cp.execSync(
  `node ${spinaciaCliScriptPath} ${args.join(' ')} --scripts-version="${packageTgzPathsByName[`@spinacia/script`]}"`,
  {
    cwd: rootDir,
    stdio: 'inherit',
  }
);

// // Cleanup
// handleExit();



// 恢复
// 获取每个 packages 里面的 package.json 内容
Object.keys(packageVersionByName).forEach((name, i, pkgsName) => {
  const packageJson = path.join(packagePathsByName[name], "package.json");
  const json = JSON.parse(fs.readFileSync(packageJson, 'utf8'));

  // delete tgz file
  fs.unlinkSync(packageTgzPathsByName[name]);

  // 用 package.json 内容对比每个 packages 的 name
  pkgsName.forEach(otherName => {
    if (json.dependencies && json.dependencies[otherName]) {
      json.dependencies[otherName] = packageVersionByName[otherName];
    }
    if (json.devDependencies && json.devDependencies[otherName]) {
      json.devDependencies[otherName] = packageVersionByName[otherName];
    }
    if (json.peerDependencies && json.peerDependencies[otherName]) {
      json.peerDependencies[otherName] = packageVersionByName[otherName];
    }
    if (json.optionalDependencies && json.optionalDependencies[otherName]) {
      json.optionalDependencies[otherName] = packageVersionByName[otherName];
    }
  });

  fs.writeFileSync(packageJson, JSON.stringify(json, null, 2), 'utf8');
  console.log(
    'Replaced local dependencies in packages/' + name + '/package.json'
  );
});