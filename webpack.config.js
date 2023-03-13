const path = require('path');
// const TerserPlugin = require("terser-webpack-plugin");

const config = {
  context: path.join(__dirname, 'src'),
  entry: [
    './main.coffee',
  ],
  output: {
    path: path.join(__dirname, 'build'),
    filename: 'bundle.js',
    publicPath: '/build/',
    hashFunction: 'xxhash64',
  },
  devServer: {
    static: {
      directory: path.resolve(__dirname, ""),
    },
    hot: false,
  },
  resolve: {
    // Temporary workaround for https://github.com/webpack/webpack/issues/16744
    // a webpack bug where importing a library built with webpack as ESM fails.
    // I provide both "module" and "main" fields in package.json in skele2d now;
    // webpack prefers "module", which broke my build of the game.
    mainFields: ['main', 'module'],
    // I don't import any other packages at this point, so the lack of granularity here
    // shouldn't cause other problems, for now.
  },
  module: {
    rules: [
      {
        test: /\.coffee$/,
        use: [ 'coffee-loader' ],
      },
      {
        test: /\.css$/,
        use: [ 'style-loader', 'css-loader' ]
      },
    ],
  },
  // I've lost some context for what I was doing here.
  // TODO: is this helping? I should test NW.js auto-saving the world, animations/poses.
  // Actually, I should ditch NW.js and just use the FS Access API.
  // I didn't care about NW.js for distribution, right? Just for development.
  // node: {
  //   fs: 'empty'
  // },
  // resolve: {
  //   alias: {
  //     fs: IS_NW ? 'fs' : 'empty-module',
  //     path: IS_NW ? 'path' : 'empty-module',
  //   }
  // },
  // TODO: re-enable minification (prod only), now that I've figured out how avoid name mangling
  optimization: {
    minimize: false,
    // minimizer: [new TerserPlugin({
    //   terserOptions: {
    //     keep_classnames: true, // needed for serialization, and display in the entities bar UI
    //   },
    // })],
  },
};
module.exports = config;
