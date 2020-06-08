import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { appConf } from './config';
import * as cookieParser from 'cookie-parser';
import * as helmet from 'helmet';
import * as rateLimit from 'express-rate-limit';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  app.use(helmet());

  app.use(cookieParser());

  app.use((req, res, next) => {
    console.log({
      body: req.body,
      headers: req.headers,
      params: req.params,
      query: req.query,
    });
    next();
  });

  app.use(
    rateLimit({
      windowMs: 3600,
      max: 1000,
    }),
  );

  await app.listen(appConf.PORT);
}
bootstrap();
