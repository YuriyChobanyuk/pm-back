import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import morgan = require('morgan');
import { AppConfigService } from './app-config/app-config.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: [/http:\/\/localhost/, /http:\/\/127.0.0.1/],
      methods: 'GET, HEAD, PUT, PATCH, POST, DELETE, OPTIONS',
      preflightContinue: false,
      optionsSuccessStatus: 204,
      credentials: true,
      allowedHeaders: ['Accept', 'Content-Type', 'Authorization'],
    },
  });

  app.use(function(req, res, next) {
    setTimeout(next, 1000);
  });

  const configService = app.get(AppConfigService);

  app.use(helmet());

  app.use(cookieParser());

  // app.use((req, res, next) => {
  //   console.log({
  //     body: req.body,
  //     headers: req.headers,
  //     params: req.params,
  //     query: req.query,
  //   });
  //   next();
  // });

  app.use(
    rateLimit({
      windowMs: 3600,
      max: 1000,
    }),
  );

  app.use(morgan('dev'));

  await app.listen(configService.applicationConfig.port);
}
bootstrap();
