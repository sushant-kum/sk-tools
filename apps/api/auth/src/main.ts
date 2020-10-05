import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { config } from 'package.json';

import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.APIAUTH_PORT || config.dev.apiauth.port;
  const globalPrefix = config.dev.apiauth.prefix;

  app.setGlobalPrefix(globalPrefix);

  const options = new DocumentBuilder()
    .setTitle('SK-Tools api-auth')
    .setDescription('The Auth API description')
    .build();
  const document = SwaggerModule.createDocument(app, options, {
    ignoreGlobalPrefix: false,
  });

  SwaggerModule.setup(`${globalPrefix}/openapi`, app, document);

  await app.listen(port, () => {
    Logger.log('Listening at http://localhost:' + port + '/' + globalPrefix);
  });
}

bootstrap();
