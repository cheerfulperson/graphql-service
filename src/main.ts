import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'dotenv';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT || 4200;
  await app.listen(port);
}
bootstrap();
