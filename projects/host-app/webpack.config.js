const { shareAll, withModuleFederationPlugin } = require('@angular-architects/module-federation/webpack');

module.exports = withModuleFederationPlugin({

  remotes: {
    "remoteApp": "http://localhost:5200/remoteEntry.js",
    "remoteApp2": "http://localhost:5201/remoteEntry.js",     
  },

  shared: {
    ...shareAll({ singleton: true, strictVersion: true, requiredVersion: 'auto' }),
  },

});
