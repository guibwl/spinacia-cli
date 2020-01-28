const path = require('path');

module.exports = function () {

  return {
    'presets': [
      [
        require.resolve('@babel/preset-env'),
        {
          'targets': {
            'browsers': [
              'last 2 versions',
              'Firefox ESR',
              '> 1%',
              'ie >= 8',
              'iOS >= 8',
              'Android >= 4'
            ]
          },
          'loose': false,
          'useBuiltIns': false,
          'debug': false
        }
      ],
      [require.resolve('@babel/preset-react')],
      [require.resolve("@babel/preset-typescript")]
    ],
    'plugins': [
      // Stage 3
      require.resolve('@babel/plugin-syntax-dynamic-import'),
      require.resolve('@babel/plugin-syntax-import-meta'),
      [
        require.resolve('@babel/plugin-proposal-class-properties'),
        {'loose': true}
      ],
      require.resolve('@babel/plugin-proposal-json-strings'),
      // antd-mobile dynamic import
      [
        require.resolve('babel-plugin-import'),
        {
          'libraryName': 'antd-mobile',
          'style': 'css'
        }
      ],
      [
        require('@babel/plugin-transform-runtime').default,
        {
          'corejs': false,
          'helpers': true,
          'regenerator': true,
          // https://babeljs.io/docs/en/babel-plugin-transform-runtime#useesmodules
          // We should turn this on once the lowest version of Node LTS
          // supports ES Modules.
          'useESModules': true,
          // Undocumented option that lets us encapsulate our runtime, ensuring
          // the correct version is used
          // https://github.com/babel/babel/blob/090c364a90fe73d36a30707fc612ce037bdbbb24/packages/babel-plugin-transform-runtime/src/index.js#L35-L42
          'absoluteRuntime': path.dirname(
            require.resolve('@babel/runtime/package.json')
          )
        },
      ],
      // svgr ReactComponent
      [
        require.resolve('babel-plugin-named-asset-import'),
        {
          'loaderMap': {
            'svg': {
              'ReactComponent': '@svgr/webpack?-svgo,+ref![path]',
            },
          },
        },
      ],
      process.env.NODE_ENV === 'test' && require.resolve('babel-plugin-istanbul')
    ].filter(Boolean)
  };
};
