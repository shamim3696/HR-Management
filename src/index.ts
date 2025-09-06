import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './config/swagger';
import { checkDbConnection } from './config/db';
import exployeeRouter from './routes/employee.route';
import errorHandler from './middlewares/globalErrorHandler';
import YAML from 'yamljs';
import hrRouter from './routes/hr.route';
import path from 'path';
import attendanceRouter from './routes/attendance.route';
const swaggerDocument = YAML.load('./src/utils/swagger.yaml');

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(
  cors({
    origin: '*',
  }),
);

app.use(
  helmet({
    contentSecurityPolicy: false,
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// routes
app.use('/api/v1/employees', exployeeRouter);
app.use('/auth', hrRouter);
app.use('/api/v1/attendance', attendanceRouter);

// Serve static files
app.use('/files', express.static(path.join(process.cwd(), 'public', 'uploads')));

// Error hander
app.use(errorHandler);

const startServer = async () => {
  await checkDbConnection();

  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`📚 Swagger docs available at http://localhost:${PORT}/api-docs`);
  });
};

startServer();
