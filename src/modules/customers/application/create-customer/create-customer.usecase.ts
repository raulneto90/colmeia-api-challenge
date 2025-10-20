import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { AppError } from '@src/config/errors/app.error';
import { Customer } from '../../domain/entities/customer.entity';
import type { CustomersRepository } from '../../domain/repositories/customers.repository';
import { CreateCustomerDTO } from '../../domain/repositories/dtos/create-customer.dto';
import { CustomerMapper } from '../../mappers/customer.mapper';

@Injectable()
export class CreateCustomerUseCase {
	constructor(
		@Inject('CustomersRepository')
		private readonly customersRepository: CustomersRepository,
	) {}

	async execute(data: CreateCustomerDTO): Promise<Customer> {
		const customerAlreadyExists = await this.customersRepository.findByFilters({
			email: data.email,
			document: data.document,
		});

		if (customerAlreadyExists) {
			throw new AppError({
				message: 'Customer with given email or document already exists',
				statusCode: HttpStatus.CONFLICT,
			});
		}

		const newCustomer = new Customer({
			name: data.name,
			email: data.email,
			phone: data.phone,
			document: data.document,
		});

		const customerData = CustomerMapper.toPersistence(newCustomer);

		const createdCustomer = await this.customersRepository.create(customerData);

		return CustomerMapper.toDomain(createdCustomer);
	}
}
