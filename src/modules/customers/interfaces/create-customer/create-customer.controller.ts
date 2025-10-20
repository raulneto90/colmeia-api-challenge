import { Body, Controller, Post, UsePipes } from '@nestjs/common';
import { ZodValidationPipe } from '@src/modules/common/pipes/zod-validation.pipe';
import { CreateCustomerUseCase } from '../../application/create-customer/create-customer.usecase';
import { Customer } from '../../domain/entities/customer.entity';
import {
	type CreateCustomerDTO,
	createCustomerSchema,
} from '../validations/create-customer.validation';

@Controller('customers')
export class CreateCustomerController {
	constructor(private readonly createCustomerUseCase: CreateCustomerUseCase) {}

	@Post()
	@UsePipes(new ZodValidationPipe(createCustomerSchema))
	async handle(@Body() data: CreateCustomerDTO): Promise<Customer> {
		return this.createCustomerUseCase.execute(data);
	}
}
