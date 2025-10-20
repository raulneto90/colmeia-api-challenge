import { Module } from '@nestjs/common';
import { PostgresCustomerRepository } from './infrastructure/repositories/postgres-customer.repository';

@Module({
	imports: [],
	controllers: [],
	providers: [PostgresCustomerRepository],
})
export class CustomersModule {}
