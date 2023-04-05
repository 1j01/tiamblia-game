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
      watch: {
        ignored: [
          // To debug this what's reloading the dev server,
          // look for "[webpack-dev-server] Server started" in the console,
          // open the file and set a breakpoint in the logging function.
          // It logs the file that triggered the reload.
          // (More directly, you can search for the "static-changed" message handler.)
          // There doesn't seem to be any useful logging in the dev server itself,
          // even when setting env var DEBUG=* (though I don't know how much of the dev server uses the debug module).
          path.resolve(__dirname, ".git/**"),
          path.resolve(__dirname, ".history/**"), // Local History VS Code extension
          path.resolve(__dirname, ".vscode/**"),
          path.resolve(__dirname, "node_modules/**"),
          path.resolve(__dirname, "build/**"), // webpack output
          path.resolve(__dirname, "app-build/**"), // folder for deployment
          // These are loaded with XHR, not imported, as of 2023-04-04.
          // But more importantly, world.json is saved with the FS Access API,
          // and if the page reloads when it changes, it can end up empty.
          // Chrome writes a .crswap file to the filesystem, and then renames it to world.json.
          path.resolve(__dirname, "world.json"),
          path.resolve(__dirname, "world.json.crswap"),
          path.resolve(__dirname, "animations/**"),
        ],
      },
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
