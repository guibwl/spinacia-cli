const fs = require('fs');
const path = require('path');
const merge = require('webpack-merge');


const config = merge(
  require('./base'),
  require('./loaders'),
  require('./plugins'),
  require('./optimization')
)

module.exports = config;
