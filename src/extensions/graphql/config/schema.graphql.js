console.log("schema.graphql.js has been invoked");
module.exports = {
  definition: `
      input CustomUsersPermissionsRegisterInput {
        username: String!
        email: String!
        password: String!
        firstname: String
        lastname: String
      }
    `,
  query: ``,
  mutation: `
      extend type Mutation {
        customRegister(input: CustomUsersPermissionsRegisterInput!): UsersPermissionsLoginPayload
      }
    `,
  resolver: {
    Mutation: {
      customRegister: {
        resolverOf: "plugin::users-permissions.auth.register",
        resolver: async (obj, args, context) => {
          const { input } = args;
          const { firstname, lastname, ...rest } = input;

          // Pass custom fields to the default register function
          const response = await strapi
            .plugin("users-permissions")
            .controllers.auth.register(context);

          // Add firstname and lastname to the user
          if (response.user) {
            await strapi.query("plugin::users-permissions.user").update({
              where: { id: response.user.id },
              data: { firstname, lastname },
            });
          }

          return response;
        },
      },
    },
  },
};
