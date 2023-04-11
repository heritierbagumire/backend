const path = require('path');
const express = require('express');
const colors = require('colors');
const dotenv = require('dotenv').config();
const { errorHandler } = require('./middleware/errorMiddleware');
const connectDB = require('./config/db');
const port = process.env.PORT || 5000;
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const app = express();

connectDB();
const swaggerJsdoc = require('swagger-jsdoc');
const { log } = require('console');


const options = {
  definition: {
    openapi: '3.0.0',
    
    info: {
      title: 'My API',
      version: '1.0.0',
      description: 'My awesome CRUD API',
    },
    servers: [
      {
        url: `http://localhost:${port}/api/v1`,
      },
    ],
  },
  apis: ['server.js'],
};





const specs = swaggerJsdoc(options);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
console.log(specs);

//  CRUD REST API routes go here...
app.use('/api/achieves', require('./routes/goalRoutes'));
app.use('/api/users', require('./routes/userRoutes'));






app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


app.use(express.json());
app.use(express.urlencoded({ extended: true }));




app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port}`));


