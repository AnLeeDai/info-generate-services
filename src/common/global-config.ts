import { INestApplication, ValidationPipe } from '@nestjs/common';
import { ResponseTransformInterceptor } from './response-transform.interceptor';

export function setupGlobalConfig(app: INestApplication) {
  // Global validation
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  );

  // Global response interceptor
  app.useGlobalInterceptors(new ResponseTransformInterceptor());
}
