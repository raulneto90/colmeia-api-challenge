import { NestFastifyApplication } from '@nestjs/platform-fastify';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export function setupSwagger(app: NestFastifyApplication): void {
	const swaggerConfig = new DocumentBuilder()
		.setTitle('Colmeia API Challenge')
		.setDescription('API documentation for Colmeia API Challenge')
		.setVersion('1.0')
		.build();

	const documentFactory = () => SwaggerModule.createDocument(app, swaggerConfig);
	SwaggerModule.setup('docs', app, documentFactory);
}
