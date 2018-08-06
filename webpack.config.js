const path = require('path');

module.exports = {
  entry: ['./src/index.js', './src/sketch.js'],
  mode: 'development',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'public')
  }
};