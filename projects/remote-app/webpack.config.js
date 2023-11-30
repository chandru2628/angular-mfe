const { shareAll, withModuleFederationPlugin } = require('@angular-architects/module-federation/webpack');

module.exports = withModuleFederationPlugin({

  name: 'remote-app',

  exposes: {
    // './Component': './projects/remote-app/src/app/app.component.ts',
    './Module': './projects/remote-app/src/app/remotes/remotes.module.ts',
  },

  shared: {
    ...shareAll({ singleton: true, strictVersion: true, requiredVersion: 'auto' }),
  },

});
