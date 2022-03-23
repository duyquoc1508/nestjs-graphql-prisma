import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { RedisIoAdapter } from './adapters/redis-io.adapter';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'debug', 'log']
  });

  // Uncomment these lines to use the Redis adapter:
  const redisIoAdapter = new RedisIoAdapter();
  await redisIoAdapter.connectToRedis();
  app.useWebSocketAdapter(redisIoAdapter)

  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap();
