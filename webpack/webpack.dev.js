const webpackMerge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = webpackMerge.merge(common, {
    devtool: 'inline-source-map',
    mode: 'development'
});