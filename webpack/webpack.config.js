import ExtractTextPlugin from 'extract-text-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import AddAssetHtmlPlugin from './addAssetHtmlPlugin';
import loaders from './loaders';
import resolve from './resolve';
import {definePlugin} from './plugins';
import webpack from 'webpack';
var DEBUG = !(['production', 'development'].includes(process.env.NODE_ENV));
var DEVELOPMENT = process.env.NODE_ENV === 'development';
var PRODUCTION = process.env.NODE_ENV === 'production';
var precss = require('precss');
var autoprefixer = require('autoprefixer');
var cssnano = require('cssnano');
import path from 'path';

export default {
    entry: {
        index: [
            `${__dirname}/../src/frontend/js/main.js`,
            `${__dirname}/../src/frontend/css/main.scss`,
        ]
    },
    module: {
        loaders: loaders('frontend'),
    },
    postcss: function () {
        return [autoprefixer({browsers: ['last 2 versions']}), precss, cssnano];
    },
    stats: {
        colors: true,
        reasons: DEBUG,
        hash: DEVELOPMENT,
        version: DEVELOPMENT,
        timings: true,
        chunks: DEVELOPMENT,
        chunkModules: DEVELOPMENT,
        cached: DEVELOPMENT,
        cachedAssets: DEVELOPMENT,
    },
    output: {
        filename: '[name].js',
        path: `${__dirname}/../build/frontend`,
        publicPath: '/'
    },
    devtool: DEBUG ? 'source-map' : (DEVELOPMENT ? '#cheap-module-eval-source-map' : '#hidden-source-map'),
    plugins: [
        definePlugin(),
        new webpack.DllReferencePlugin({
            context: path.join(__dirname),
            manifest: require('../build/frontend/Babel-manifest.json')
        }),
        new webpack.DllReferencePlugin({
            context: path.join(__dirname),
            manifest: require('../build/frontend/React-manifest.json')
        }),
        new webpack.DllReferencePlugin({
            context: path.join(__dirname),
            manifest: require('../build/frontend/Redux-manifest.json')
        }),
        new webpack.DllReferencePlugin({
            context: path.join(__dirname),
            manifest: require('../build/frontend/App-manifest.json')
        }),
        new HtmlWebpackPlugin(
            {
                filename: 'index.html',
                template: `${__dirname}/../src/frontend/index.html`,
                inject: 'body',
                hash: true,
                ...(PRODUCTION ? {
                    minify: {
                        removeComments: true,
                        collapseWhitespace: true,
                        removeRedundantAttributes: true,
                        useShortDoctype: true,
                        removeEmptyAttributes: true,
                        removeStyleLinkTypeAttributes: true,
                        keepClosingSlash: true,
                        minifyJS: true,
                        minifyCSS: true,
                        minifyURLs: true
                    }
                } : {})
            }
        ),
        new AddAssetHtmlPlugin({
            filename: require.resolve('../build/frontend/Babel.dll.js'),
        }),
        new AddAssetHtmlPlugin({
            filename: require.resolve('../build/frontend/React.dll.js'),
        }),
        new AddAssetHtmlPlugin({
            filename: require.resolve('../build/frontend/Redux.dll.js'),
        }),
        new AddAssetHtmlPlugin({
            filename: require.resolve('../build/frontend/App.dll.js'),
        }),
        ...(PRODUCTION ? [
            new ExtractTextPlugin('[name].css', {
                allChunks: false,
            }),
            new webpack.optimize.DedupePlugin(),
            new webpack.optimize.UglifyJsPlugin({
                compress: {
                    screw_ie8: true,
                },
            }),
            new webpack.optimize.AggressiveMergingPlugin(),
        ] : []),
    ],
    resolve: resolve(),
    devServer: {
        historyApiFallback: true,
    },
    watch: true,
    cache: true,
};
