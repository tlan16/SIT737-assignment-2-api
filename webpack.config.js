const webpack = require('webpack');
const path = require('path');
const fs = require('fs');

let nodeModules = {};
fs.readdirSync('node_modules')
    .filter(x => {
        return ['.bin'].indexOf(x) === -1;
    })
    .forEach(mod => {
        nodeModules[mod] = 'commonjs ' + mod;
    });

module.exports = {
    entry: path.resolve(__dirname, 'src', 'main.js'),
    target: 'node',
    externals: nodeModules,
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: '/',
    },
    devtool: 'eval',
    plugins: [
    ],
};