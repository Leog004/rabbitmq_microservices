"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const microservices_1 = require("@nestjs/microservices");
async function bootstrap() {
    try {
        const app = await core_1.NestFactory.create(app_module_1.AppModule);
        app.setGlobalPrefix('/api');
        app.enableCors({
            origin: ['http://localhost:4200'],
            methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
            credentials: true,
        });
        app.connectMicroservice({
            transport: microservices_1.Transport.RMQ,
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
    }
    catch (error) {
        console.error('Error during application initialization', error);
        process.exit(1);
    }
}
bootstrap();
//# sourceMappingURL=main.js.map