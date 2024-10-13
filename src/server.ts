import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser'; 
import loginRoute from './routes/authRoutes';
import  swaggerUi  from 'swagger-ui-express';
import swaggerJsDoc from 'swagger-jsdoc';
dotenv.config();

const app = express();
app.use(express.json());
app.use(cookieParser());  



const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Class Grades API',
      version: '1.0.0',
      description: 'API for managing user roles, grades, and more',
    },
    servers: [
      {
        url: 'http://localhost:3000', 
      },
    ],
  },
  apis: ['./routes/*.js'], 
};

const swaggerSpec = swaggerJsDoc(swaggerOptions);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))



mongoose
  .connect(process.env.DB_URI as string)
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch((err) => console.error('MongoDB connection error:', err));

app.use('/api/users', loginRoute);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
