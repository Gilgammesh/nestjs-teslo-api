import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { AppConfig } from './config/app.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix(AppConfig().appGlobalPrefix);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true
    })
  );
  const config = new DocumentBuilder()
    .setTitle('Teslo Api')
    .setDescription('Teslo Shop Restful Api')
    .setVersion('1.0')
    .addBearerAuth({
      type: 'http',
      description: 'Authorization token'
    })
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document, {
    swaggerOptions: {
      defaultModelsExpandDepth: -1,
      defaultModelExpandDepth: -1
    },
    customSiteTitle: 'Teslo API documentation'
  });

  await app.listen(AppConfig().appPort);
}
bootstrap();
