#!/usr/bin/env node
/**
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const path = require('path');
const cp = require('child_process');
const fs = require("fs-extra");


const rootDir = path.join(__dirname, '..');
const packagesDir = path.join(rootDir, 'packages', '@spinacia');


fs.readdirSync(packagesDir).forEach(name => {
  const packageDir = path.join(packagesDir, name);
  const packageJson = path.join(packageDir, 'package.json');
  if (fs.existsSync(packageJson)) {
    cp.execSync(
        `cd ${packageDir} && npm pack`,
        {
          cwd: rootDir,
          stdio: 'inherit',
        }
    );
  }
});