const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Cake & Consumer API',
      version: '1.0.0',
      description: 'API for managing cakes and consumers',
    },
    servers: [
      {
        url: 'http://localhost:3000', // for local
      },
      {
        url: 'https://cse-341-node-project2.onrender.com', // for Render deployment
      },
    ],
  },
  apis: ['./routes/*.js'], // <-- path to your route files
};

const swaggerSpec = swaggerJsdoc(options);

function swaggerDocs(app) {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}

module.exports = swaggerDocs;
