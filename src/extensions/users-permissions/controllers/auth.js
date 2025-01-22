module.exports = {
  async register(ctx) {
    console.log("Incoming payload:", ctx.request.body);

    const { username, email, password, firstname, lastname } = ctx.request.body;

    if (!username || !email || !password) {
      return ctx.badRequest("Missing required fields");
    }

    // Check for additional fields
    if (!firstname || !lastname) {
      return ctx.badRequest("Missing firstname or lastname");
    }

    // Proceed with user creation
    const newUser = await strapi
      .query("plugin::users-permissions.user")
      .create({
        data: { username, email, password, firstname, lastname },
      });

    const jwt = strapi.plugins["users-permissions"].services.jwt.issue({
      id: newUser.id,
    });
    ctx.send({ jwt, user: newUser });
  },
};
