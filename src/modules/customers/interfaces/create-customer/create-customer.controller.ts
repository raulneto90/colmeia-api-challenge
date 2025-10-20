import { Body, Controller, HttpStatus, Post, UsePipes } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ZodValidationPipe } from '@src/modules/common/pipes/zod-validation.pipe';
import { CreateCustomerUseCase } from '../../application/create-customer/create-customer.usecase';
import { Customer } from '../../domain/entities/customer.entity';
import type { CreateCustomerDTO } from '../../domain/repositories/dtos/create-customer.dto';
import { CreateCustomerRequestDTO } from '../dtos/create-customer-request.dto';
import { CreateCustomerResponseDTO } from '../dtos/create-customer-response.dto';
import { createCustomerSchema } from '../validations/create-customer.validation';

@Controller('customers')
@ApiTags('Customers')
export class CreateCustomerController {
	constructor(private readonly createCustomerUseCase: CreateCustomerUseCase) {}

	@Post()
	@ApiOperation({ summary: 'Create a new customer' })
	@ApiBody({ type: CreateCustomerRequestDTO })
	@ApiResponse({
		status: HttpStatus.CREATED,
		description: 'The customer has been successfully created.',
		type: CreateCustomerResponseDTO,
	})
	@ApiResponse({
		status: HttpStatus.BAD_REQUEST,
		description: 'Invalid input data',
	})
	@ApiResponse({
		status: HttpStatus.CONFLICT,
		description: 'Customer with the given email or document already exists',
	})
	@ApiResponse({
		status: HttpStatus.INTERNAL_SERVER_ERROR,
		description: 'Internal server error',
	})
	@UsePipes(new ZodValidationPipe(createCustomerSchema))
	async handle(@Body() data: CreateCustomerDTO): Promise<Customer> {
		return this.createCustomerUseCase.execute(data);
	}
}
