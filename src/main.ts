import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { AppModule } from './app.module';
import { env } from './config/env/environment';
import { setupSwagger } from './config/swagger/swagger.config';

async function bootstrap() {
	const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter());

	setupSwagger(app);

	await app.listen(env.APP_PORT);
}

bootstrap();
