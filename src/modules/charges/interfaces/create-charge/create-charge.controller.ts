import { Body, Controller, HttpStatus, Post, UsePipes } from '@nestjs/common';
import { ApiBody, ApiExtraModels, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ZodValidationPipe } from '@src/modules/common/pipes/zod-validation.pipe';
import { CreateChargeUseCase } from '../../application/create-charge/create-charge.usecase';
import type { CreateChargeDto } from '../../domain/repositories/dtos/create-charge.dto';
import { ChargeMapper } from '../../mappers/charge.mapper';
import {
	BoletoPaymentData,
	CreateChargeRequestDTO,
	CreditCardPaymentData,
	PixPaymentData,
} from '../dtos/create-charge-request.dto';
import { CreateChargeResponseDTO } from '../dtos/create-charge-response.dto';
import { createChargeValidation } from '../validations/create-charge.validation';

@Controller('charges')
@ApiTags('Charges')
@ApiExtraModels(
	PixPaymentData,
	CreditCardPaymentData,
	BoletoPaymentData,
	CreateChargeRequestDTO,
	CreateChargeResponseDTO,
)
export class CreateChargeController {
	constructor(private readonly createChargeUseCase: CreateChargeUseCase) {}

	@Post()
	@ApiOperation({ summary: 'Create a new charge' })
	@ApiBody({ type: CreateChargeRequestDTO })
	@ApiResponse({
		status: HttpStatus.CREATED,
		description: 'The charge has been successfully created.',
		type: CreateChargeResponseDTO,
	})
	@ApiResponse({
		status: HttpStatus.BAD_REQUEST,
		description: 'Invalid input data',
	})
	@ApiResponse({
		status: HttpStatus.NOT_FOUND,
		description: 'Customer not found',
	})
	@ApiResponse({
		status: HttpStatus.INTERNAL_SERVER_ERROR,
		description: 'Internal server error',
	})
	@UsePipes(new ZodValidationPipe(createChargeValidation))
	async handle(@Body() data: CreateChargeDto): Promise<CreateChargeResponseDTO> {
		const charge = await this.createChargeUseCase.execute(data);
		return ChargeMapper.toResponseDto(charge);
	}
}
