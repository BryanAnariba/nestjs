import { NestFactory } from '@nestjs/core';
import { AppModule } from './presentation/app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { envs } from './config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const logger = new Logger('--->My First App<---');
  const app = await NestFactory.create(AppModule, {cors: true});

  app.setGlobalPrefix('api');
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('My First App Documentation')
    .setDescription('The cats API description')
    .setVersion('1.0')
    .addTag('My First App')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  
  app.enableCors({origin: 'http://localhost:4200'});

  await app.listen(envs.port);
  logger.log('Nest Server started on port: ' + envs.port);
}
bootstrap();
