import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CustomIoAdapter } from './letter/custom_io_adapter';

import { setupSwagger } from './swagger.setup';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: 'http://localhost:80',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });
  //WebSocket CORS 설정
  app.useWebSocketAdapter(new CustomIoAdapter(app));

  setupSwagger(app);
  await app.listen(3002);
}
bootstrap();
