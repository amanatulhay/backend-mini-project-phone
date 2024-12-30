import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();  

  const config = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('Mini Project Backend - Phone Blog')
    .setDescription('Mini project backend by Amanatulhay')
    .setVersion('1.0')
    .addTag('project')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  
  await app.listen(8080);
}
bootstrap();
