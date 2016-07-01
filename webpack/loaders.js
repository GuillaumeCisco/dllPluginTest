import ExtractTextPlugin from 'extract-text-webpack-plugin';
var DEBUG = !(['production', 'development'].includes(process.env.NODE_ENV));
var DEVELOPMENT = process.env.NODE_ENV === 'development';
var PRODUCTION = process.env.NODE_ENV === 'production';

export default function (appName) {
    const prefix = appName ? `${appName}/` : '';

    const loaders = [{
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        // Options to configure babel with
        query: {
            cacheDirectory: true, //important for performance
            plugins: [
                'transform-runtime',
                ...(PRODUCTION ? [
                    "transform-react-constant-elements",
                    "transform-react-inline-elements",
                    "transform-react-remove-prop-types"
                ] : [])
            ],
            presets: [
                "react",
                "es2015",
                "stage-0",
            ]
        },
    }, {
        test: /\.json$/,
        loader: 'json-loader',
    }, {
        test: /\.jpe?g$|\.gif$|\.png$/,
        loader: `url-loader?limit=10000&name=/${prefix}[hash].[ext]`,
    }, {
        test: /\.(otf|svg)(\?.+)?$/,
        loader: 'url-loader?limit=8192',
    }, {
        test: /\.eot(\?\S*)?$/,
        loader: 'url-loader?limit=100000&mimetype=application/vnd.ms-fontobject',
    }, {
        test: /\.woff2(\?\S*)?$/,
        loader: 'url-loader?limit=100000&mimetype=application/font-woff2',
    }, {
        test: /\.woff(\?\S*)?$/,
        loader: 'url-loader?limit=100000&mimetype=application/font-woff',
    }, {
        test: /\.ttf(\?\S*)?$/,
        loader: 'url-loader?limit=100000&mimetype=application/font-ttf',
    }, {
        test: /\.html$/,
        loader: 'html',
    }, {
        test: /\.s?css$/,
        ...(PRODUCTION ? {loader: ExtractTextPlugin.extract('style-loader', ['css-loader', 'postcss-loader'])} : {loaders: ["style", "css", "sass"]} )
    }];

    return loaders;
}
