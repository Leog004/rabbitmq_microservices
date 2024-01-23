import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  try {
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
          'amqps://tuxxiaqn:UDbzaynGmRs1VhNlL6w3ZY6JMZsTndd7@woodpecker.rmq.cloudamqp.com/tuxxiaqn',
        ],
        queue: 'main_queue',
        queueOptions: {
          durable: false,
        },
      },
    });

    await app.startAllMicroservices();
    await app.listen(8001);

    console.log('HTTP server is listening on port 8001');
    console.log('Microservice is listening');
  } catch (error) {
    console.error('Error during application initialization', error);
    process.exit(1); // Exit with a failure code
  }
}

bootstrap();
