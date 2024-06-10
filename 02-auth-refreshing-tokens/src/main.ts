import { NestFactory } from '@nestjs/core';
import { AppModule } from './presentation/app.module';
import { Logger, ValidationPipe } from '@nestjs/common';

async function bootstrap() {

  const logger = new Logger("==>Main App<==");

  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );
  await app.listen(3500);

  logger.log(`Nest server started on port ${3500}`)
}
bootstrap();
