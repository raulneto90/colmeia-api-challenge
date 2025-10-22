import { Module } from '@nestjs/common';
import { ChargesModule } from './modules/charges/charges.module';
import { CustomersModule } from './modules/customers/customers.module';

@Module({
	imports: [CustomersModule, ChargesModule],
	controllers: [],
	providers: [],
})
export class AppModule {}
