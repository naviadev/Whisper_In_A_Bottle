import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// import { CustomIoAdapter } from './modules/letter/custom-io-adapter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'http://localhost:3000',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type, Authorization',
    credentials: true,
  });

  // WebSocket CORS 설정
  // app.useWebSocketAdapter(new CustomIoAdapter(app));

  await app.listen(3001);
}
bootstrap();
