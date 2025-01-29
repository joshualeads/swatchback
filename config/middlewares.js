const CLOUDINARY_CDN_URL = "res.cloudinary.com";

module.exports = [
  "strapi::logger",
  "strapi::errors",
  "strapi::security",
  "strapi::cors",
  "strapi::poweredBy",
  "strapi::query",
  "strapi::body",
  "strapi::session",
  "strapi::favicon",
  "strapi::public",
  {
    name: "strapi::security",
    config: {
      contentSecurityPolicy: {
        directives: {
          "connect-src": ["'self'", "https:"],
          "img-src": ["'self'", "data:", "blob:", `${CLOUDINARY_CDN_URL}`],
          "media-src": ["'self'", "data:", "blob:", `${CLOUDINARY_CDN_URL}`],
          upgradeInsecureRequests: null,
        },
      },
    },
  },
];
