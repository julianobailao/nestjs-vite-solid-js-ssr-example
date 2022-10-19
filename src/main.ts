import { join } from 'path';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  NestFastifyApplication,
  FastifyAdapter,
} from '@nestjs/platform-fastify';
import viewEngine from './starter/server-side-rendering/view-engine.plugin';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );

  await app.register(viewEngine, {
    templates: join(__dirname, '../../views/pages'),
  });

  await app.useStaticAssets({
    root: join(__dirname, '..', 'public'),
    prefix: '/',
  });

  await app.listen(3000);
}

bootstrap();
