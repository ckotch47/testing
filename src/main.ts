import {HttpAdapterHost, NestFactory} from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import {AllExceptionsFilter} from "./common/http-exception.filter";
import {ConfigService} from "@nestjs/config";
async function bootstrap() {
  const app = await NestFactory.create(AppModule);


  const options = new DocumentBuilder()
      .setTitle('test')
      .setDescription('')
      .setVersion('1.0')
      .addTag('test')
      .setExternalDoc('JSON', '/api-json/')
      .build();
  app.useGlobalFilters(new AllExceptionsFilter(app.get(HttpAdapterHost), app.get(ConfigService)));
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('docs', app, document);

  await app.listen(3000);
}
bootstrap();
