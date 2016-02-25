//from https://github.com/christianalfoni/react-webpack-cookbook/wiki

var path = require('path');

module.exports = {
   //run as separate server, auto-refreshing
   entry: [
      'webpack/hot/dev-server',
      'webpack-dev-server/client?http://localhost:8080',
      path.resolve(__dirname, 'app/main.js')
    ],
    //non-autorefreshing:
    //entry: path.resolve(__dirname, 'app/main.js'),

    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'bundle.js',
    },

    //handle jsx
    module: {
      loaders: [{
        test: /\.jsx?$/, // A regexp to test the require path. accepts either js or jsx
        loader: 'babel', // The module to load. "babel" is short for "babel-loader"
        exclude: /node_modules/, //don't compile node modules
        query: {presets:['react']}
      }]
  }
};