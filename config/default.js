var apiPort = process.env.NODE_PORT || 3000; // eslint-disable-line no-var
var apiUrl = 'https://api.domain.com'; // eslint-disable-line no-var

module.exports = {
    appName: 'Project',
    apps: {
        frontend: {
            api_url: apiUrl,
            api_port: apiPort,
        },
    },
    babel_ignore: /node_modules\/(?!admin-config)/,
};
