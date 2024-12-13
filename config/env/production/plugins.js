// ./config/env/production/plugins.js

module.exports = ({ env }) => ({
  graphql: {
    config: {
      endpoint: "/graphql-api",
      shadowCRUD: true,
      playgroundAlways: true,
      depthLimit: 10,
      amountLimit: 100,
      apolloServer: {
        tracing: false,
        introspection: true,
      },
    },
  },
});
