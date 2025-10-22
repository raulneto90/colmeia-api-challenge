import { Module } from '@nestjs/common';
import { PrismaService } from '../common/services/prisma.service';
import { PostgresCustomerRepository } from '../customers/infrastructure/repositories/postgres-customer.repository';
import { CreateChargeUseCase } from './application/create-charge/create-charge.usecase';
import { PostgresChargeRepository } from './infrastructure/repositories/postgres-charge.repository';
import { CreateChargeController } from './interfaces/create-charge/create-charge.controller';

@Module({
	imports: [],
	controllers: [CreateChargeController],
	providers: [
		PrismaService,
		{
			provide: 'ChargesRepository',
			useClass: PostgresChargeRepository,
		},
		{
			provide: 'CustomersRepository',
			useClass: PostgresCustomerRepository,
		},
		CreateChargeUseCase,
	],
})
export class ChargesModule {}
