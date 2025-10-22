import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { AppError } from '@src/config/errors/app.error';
import type { CustomersRepository } from '@src/modules/customers/domain/repositories/customers.repository';
import type { Charge } from '../../domain/entities/charge.entity';
import { ChargeStatus } from '../../domain/enums/charge-status.enum';
import { ChargeFactory } from '../../domain/factories/charge.factory';
import type { ChargesRepository } from '../../domain/repositories/charges.repository';
import type { CreateChargeDto } from '../../domain/repositories/dtos/create-charge.dto';

@Injectable()
export class CreateChargeUseCase {
	constructor(
		@Inject('ChargesRepository')
		private readonly chargesRepository: ChargesRepository,
		@Inject('CustomersRepository')
		private readonly customersRepository: CustomersRepository,
	) {}

	async execute(data: CreateChargeDto): Promise<Charge> {
		const customerExists = await this.customersRepository.findByFilters({
			id: data.customerId,
		});

		if (!customerExists) {
			throw new AppError({
				message: 'Customer not found',
				statusCode: HttpStatus.NOT_FOUND,
			});
		}

		const charge = ChargeFactory.create({
			customerId: data.customerId,
			amount: data.amount,
			currency: data.currency || 'BRL',
			paymentMethod: data.paymentMethod,
			status: ChargeStatus.PENDING,
			paymentData: data.paymentData,
		} as any);

		const createdCharge = await this.chargesRepository.create({
			id: charge.id,
			customerId: charge.customerId,
			amount: charge.amount,
			currency: charge.currency,
			paymentMethod: charge.paymentMethod,
			status: charge.status,
			paymentData: data.paymentData,
		});

		return createdCharge;
	}
}
