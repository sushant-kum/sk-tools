import { INestApplication, Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as helmet from 'helmet';

import { environment as env } from '@apps/api/auth/environments/environment';

import { AppModule } from './app/app.module';

function createOpenApiDoc(app: INestApplication, globalPrefix: string): void {
  const options = new DocumentBuilder()
    .setTitle('SK-Tools api-auth')
    .setDescription('The Auth API description')
    .build();
  const document = SwaggerModule.createDocument(app, options, {
    ignoreGlobalPrefix: false,
  });

  SwaggerModule.setup(`${globalPrefix}/openapi`, app, document);
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = env.port;
  const globalPrefix = env.prefix;

  app.setGlobalPrefix(globalPrefix);
  app.use(helmet());
  app.enableCors(env.corsConfig);

  if (!env.production) {
    createOpenApiDoc(app, globalPrefix);
  }

  await app.listen(port, () => {
    Logger.log(`Listening at ${env.hostname}:${port}/${globalPrefix}`);
  });
}

bootstrap();
