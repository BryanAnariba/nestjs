import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { environmentVariables } from './core/config';

async function bootstrap() {
  const logger = new Logger('Books Api Rest');
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');

  app.enableCors();

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    })
  );
  
  await app.listen(environmentVariables.port);
  logger.log(`====> Books App Starting on port ${environmentVariables.port} <====`);
}
bootstrap();
