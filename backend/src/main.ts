import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as express from 'express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Enable CORS
  app.enableCors();

  // Use global validation pipes for DTOs
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  // Serve static files from public/uploads folder under /uploads path
  app.use('/uploads', express.static(join(process.cwd(), 'public', 'uploads')));

  const port = process.env.PORT || 5001;
  await app.listen(port);
  console.log(`NestJS Backend server is running on: http://localhost:${port}`);
}
bootstrap();
