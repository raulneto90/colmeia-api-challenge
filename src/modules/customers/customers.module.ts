import { Module } from '@nestjs/common';
import { PrismaService } from '../common/services/prisma.service';
import { CreateCustomerUseCase } from './application/create-customer/create-customer.usecase';
import { PostgresCustomerRepository } from './infrastructure/repositories/postgres-customer.repository';
import { CreateCustomerController } from './interfaces/create-customer/create-customer.controller';

@Module({
	imports: [],
	controllers: [CreateCustomerController],
	providers: [
		PrismaService,
		{
			provide: 'CustomersRepository',
			useClass: PostgresCustomerRepository,
		},
		CreateCustomerUseCase,
	],
})
export class CustomersModule {}
