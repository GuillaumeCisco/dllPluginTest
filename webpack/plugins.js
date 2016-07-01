import config from 'config';
import webpack from 'webpack';

var DEBUG = process.env.NODE_ENV !== 'production';

export function definePlugin() {
    return new webpack.DefinePlugin({
        'process.env.NODE_ENV': DEBUG ? '"development"' : '"production"',
        APP_NAME: JSON.stringify(config.appName),
        API_URL: JSON.stringify(config.apps.frontend.api_url),
        FRONTEND_HISTORY: JSON.stringify(config.apps.frontend.history),
    });
}
