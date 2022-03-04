import 'reflect-metadata';
import express, { Request, Response } from 'express';
import 'express-async-errors';
import cors from 'cors';
import { errors } from 'celebrate';
import routes from './routes';
import AppError from '@shared/errors/AppError';
import '@shared/typeorm';
import uploadConfig from '@config/upload';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/files', express.static(uploadConfig.directory));
app.use(routes);

app.use(errors());

app.use((error: Error, request: Request, response: Response) => {
  if (error instanceof AppError) {
    return response.status(error.statusCode).json({
      status: 'erro',
      message: error.message,
    });
  }

  console.log(error);

  return response.status(500).json({
    status: 'erro',
    message: 'Internal server error',
  });
});

const port = 3333;
app.listen(port, () => {
  console.log('Servidor rodando na porta ' + port);
});
