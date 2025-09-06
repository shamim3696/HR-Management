import swaggerJsdoc from 'swagger-jsdoc';

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'HR Management API',
      version: '1.0.0',
      description: 'API documentation for the HR Management system',
    },
    servers: [
      {
        url: 'http://localhost:3000',
      },
    ],
  },
  apis: ['src/routes/*.ts', 'src/controllers/*.ts'],
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;
