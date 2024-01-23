import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('/api');
  app.enableCors({
    origin: ['http://localhost:4200'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: [
        'amqps://bazxziam:blfsU_6-qhOMglXPivBERwLFHWXHQtfM@woodpecker.rmq.cloudamqp.com/bazxziam',
      ],
      queue: 'admin_queue',
      queueOptions: {
        durable: false,
      },
    },
  });

  await app.listen(8000);
  await app.startAllMicroservices();

  console.log('HTTP server is listening on port 8000');
  console.log('Microservice is listening');
}
bootstrap();
