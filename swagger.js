const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Project2 API",
      version: "1.0.0",
      description: "Project2 API with OAuth authentication",
    },
    servers: [
      { url: "http://localhost:3000" },
      { url: "https://cse-341-node-project2.onrender.com" },
    ],
    components: {
      securitySchemes: {
        githubAuth: {
          type: "oauth2",
          flows: {
            authorizationCode: {
              authorizationUrl: "https://github.com/login/oauth/authorize",
              tokenUrl: "https://github.com/login/oauth/access_token",
              scopes: {
                "user:email": "Read user email",
              },
            },
          },
        },
      },
    },
  },
  apis: ["./routes/*.js"],
};

const specs = swaggerJsdoc(options);

module.exports = (app) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
};
