import { NestFactory } from '@nestjs/core';
import { AppModule } from './presentation/app.module';
import { envs } from './config';
import { Logger, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const logger = new Logger('Books App API Main');

  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true, // Ej: dto -> {"email": "test@gmail.com"}, lo que se manda frontend -> {"email": "test@gmail.com", "gender": "F"}, Lo que aceptara nest -> {"email": "test@gmail.com"}
    })
  );

  await app.listen(envs.port);
  logger.log(`Nest server started on port: ${envs.port}`);
}
bootstrap();
