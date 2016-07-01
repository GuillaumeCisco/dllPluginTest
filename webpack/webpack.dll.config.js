import webpack from 'webpack';
import path from 'path';

export default {
    entry: {
        Babel: [
            "babel-cli",
            "babel-core",
            "babel-eslint",
            "babel-loader",
            "babel-plugin-add-module-exports",
            "babel-plugin-transform-runtime",
            "babel-polyfill",
            "babel-preset-es2015",
            "babel-preset-react",
            "babel-preset-stage-0",
            "babel-register",
            "babel-runtime",
        ],
        React: [
            "react",
            "react-addons-test-utils",
            "react-datetime",
            "react-dom",
            "react-dropzone",
            "react-helmet",
            "react-highcharts",
            "react-motion",
            "react-redux",
            "react-router",
            "react-router-redux",
            "react-router-transition",
            "react-select",
            "react-simpletabs",
            "react-skylight",
            "reactable",
            "reselect",
            "babel-plugin-transform-react-constant-elements",
            "babel-plugin-transform-react-inline-elements",
            "babel-plugin-transform-react-remove-prop-types",
        ],
        Redux: [
            "redux",
            "redux-actions",
            "redux-devtools",
            "redux-devtools-dock-monitor",
            "redux-devtools-filter-actions",
            "redux-devtools-log-monitor",
            "redux-form",
            "redux-form-schema",
            "redux-mock-store",
            "redux-saga",
            "redux-thunk",
        ],
        App: [
            "classnames",
            "fastclick",
            "file-loader",
            "history",
            "immutable",
            "isomorphic-fetch",
            "jwt-decode",
            "lodash",
            "moment",
            "moment-transform",
            "query-string",
            "rc-menu",
        ]
    },
    devtool: '#source-map',
    output: {
        path: path.join(__dirname, '../build/frontend'),
        filename: '[name].dll.js',
        library: '[name]_[hash]',
    },

    plugins: [
        new webpack.DllPlugin({
            name: '[name]_[hash]',
            path: path.join(__dirname, '../build/frontend', '[name]-manifest.json'),
        })
    ]
};
