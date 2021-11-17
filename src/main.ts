import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe())
  app.enableCors();
  app.setGlobalPrefix('ae/api');
  // app.useLogger(app.get(ConfigService).get('LOG').split(','));

  const config = new DocumentBuilder()
    .setTitle("Agri-Enterprise API")
    .setDescription("List of apis")
    .setVersion("1.0.0")
    .addBearerAuth()
    .build();
  
  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('/api-doc', app, document);
  
  await app.listen(app.get(ConfigService).get<number>('PORT', 3000));
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
