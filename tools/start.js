import Browsersync from 'browser-sync';
import webpack from 'webpack';
import webpackMiddleware from 'webpack-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import WebpackDevServer from 'webpack-dev-server';
import webpackConfig from '../webpack.config.babel';
import config from 'config';

/**
 * Launches a development web server with "live reload" functionality -
 * synchronizing URLs, interactions and code changes across multiple devices.
 */
async function start() {
    await new Promise(resolve => {
        // Patch the client-side bundle configurations
        // to enable Hot Module Replacement (HMR) and React Transform

        webpackConfig[0].entry.index.unshift('webpack-dev-server/client?http://localhost:' + config.apps.frontend.api_port + '/'); // WebpackDevServer host and port
        webpackConfig[0].entry.index.unshift('webpack/hot/dev-server'); // "only" prevents reload on syntax errors

        webpackConfig[0].plugins.splice(1, 0, new webpack.optimize.OccurenceOrderPlugin());
        webpackConfig[0].plugins.splice(2, 0, new webpack.HotModuleReplacementPlugin());
        webpackConfig[0].plugins.splice(3, 0, new webpack.NoErrorsPlugin());

        webpackConfig[0]
            .module
            .loaders
            .filter(x => x.loader === 'babel-loader')
            .forEach(x => (x.query = { // eslint-disable-line no-param-reassign
                // Wraps all React components into arbitrary transforms
                // https://github.com/gaearon/babel-plugin-react-transform
                presets: [
                    "es2015",
                    "react",
                    "stage-0",
                    "react-hmre"
                ],
            }));

        // First we fire up Webpack an pass in the configuration we
        // created
        var bundleStart = null;
        var compiler = webpack(webpackConfig[0]);

        // TODO : better use https://www.npmjs.com/package/browser-sync-webpack-plugin for browserSync integration
        // const wpMiddleware = webpackMiddleware(compiler, {
        //     // IMPORTANT: webpack middleware can't access config,
        //     // so we should provide publicPath by ourselves
        //     publicPath: webpackConfig[0].output.publicPath,
        //     quiet: true,
        //     noInfo: true,
        //     // Pretty colored output
        //     stats: webpackConfig[0].stats,
        //
        //     // For other settings see
        //     // https://webpack.github.io/docs/webpack-dev-middleware
        // });
        // const hotMiddleware = webpackHotMiddleware(compiler);

        // We give notice in the terminal when it starts bundling and
        // set the time it started
        compiler.plugin('compile', function () {
            console.log('Bundling...');
            bundleStart = Date.now();
        });

        // We also give notice when it is done compiling, including the
        // time it took. Nice to have
        compiler.plugin('done', function () {
            console.log('Bundled in ' + (Date.now() - bundleStart) + 'ms!');
            resolve();
        });

        new WebpackDevServer(compiler, {
            publicPath: webpackConfig[0].output.publicPath,
            hot: true,
            watchOptions: {
                aggregateTimeout: 300,
                poll: 1000
            },
            quiet: false,
            noInfo: false,
            // Pretty colored output
            stats: webpackConfig[0].stats,
            historyApiFallback: true
        }).listen(config.apps.frontend.api_port, 'localhost', function (err, result) {
            if (err) {
                return console.log(err);
            }

            const bs = Browsersync.create();
            bs.init({
                open: false,
                proxy: {
                    target: 'localhost:' + config.apps.frontend.api_port,
                    //middleware: [wpMiddleware, hotMiddleware],
                },
                // no need to watch '*.js' here, webpack will take care of it for us,
                // including full page reloads if HMR won't work
                files: ['build/frontend/**/*.*'],
            }, resolve);

            console.log('Bundling project, please wait...');
            console.log('Listening at http://localhost:' + config.apps.frontend.api_port + '/');
        });
    });
}

export default start;
