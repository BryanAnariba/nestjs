import { NestFactory } from '@nestjs/core';
import { AppModule } from './presentation/app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { envs } from './config';

async function bootstrap() {
  const logger = new Logger('--->My First App<---');
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );
  
  await app.listen(envs.port);
  logger.log('Nest Server started on port: ' + envs.port);
}
bootstrap();
