import { Inject, Injectable } from '@nestjs/common';
import type { CustomersRepository } from '../../domain/repositories/customers.repository';
import { CreateCustomerDTO } from '../../domain/repositories/dtos/create-customer.dto';

@Injectable()
export class CreateCustomerUseCase {
	constructor(
		@Inject('CustomersRepository')
		private readonly customersRepository: CustomersRepository,
	) {}

	async execute(data: CreateCustomerDTO) {
		const customerAlreadyExists = await this.customersRepository.findByFilters({
			email: data.email,
			document: data.document,
		});

		if (customerAlreadyExists) {
			throw new Error('Customer already exists');
		}

		return this.customersRepository.create(data);
	}
}
