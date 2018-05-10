const webpack = require('webpack');
const path = require('path');
const fs = require('fs');

const nodeModules = {};
fs.readdirSync('node_modules')
    .filter(x => {
        return ['.bin'].indexOf(x) === -1;
    })
    .forEach(mod => {
        nodeModules[mod] = 'commonjs ' + mod;
    });

module.exports = {
    entry: {
        api: path.resolve(__dirname, 'src', 'api', 'index.js'),
        app: path.resolve(__dirname, 'src', 'app', 'index.js'),
    },
    target: 'node',
    externals: nodeModules,
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js',
        publicPath: '/',
    },
    devtool: 'eval',
    plugins: [
    ],
};