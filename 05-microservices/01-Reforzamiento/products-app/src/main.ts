import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const logger = new Logger("===>Products Application NestJS<===");
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true, // Asegura que vengan las propieades del dto en el body
      forbidNonWhitelisted: true, 
      whitelist: true, // Lanza error si en el body hay una propiedad que no esta en el dto
    }),
  );

  app.setGlobalPrefix('api');
  app.enableCors();

  await app.listen(3000);
  
  logger.log(`Nest JS Server started on port: ${3000}`);
}
bootstrap();
