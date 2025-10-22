import { ApiProperty } from '@nestjs/swagger';

export class CreateChargeResponseDTO {
	@ApiProperty({
		description: 'Unique identifier for the charge',
		example: '123e4567-e89b-12d3-a456-426614174000',
	})
	id: string;

	@ApiProperty({
		description: 'Customer ID',
		example: '123e4567-e89b-12d3-a456-426614174000',
	})
	customerId: string;

	@ApiProperty({
		description: 'Charge amount',
		example: 100.5,
	})
	amount: number;

	@ApiProperty({
		description: 'Currency code',
		example: 'BRL',
	})
	currency: string;

	@ApiProperty({
		description: 'Payment method',
		enum: ['PIX', 'CREDIT_CARD', 'BOLETO'],
		example: 'PIX',
	})
	paymentMethod: string;

	@ApiProperty({
		description: 'Charge status',
		enum: ['PENDING', 'PAID', 'FAILED', 'EXPIRED', 'CANCELLED'],
		example: 'PENDING',
	})
	status: string;

	@ApiProperty({
		description: 'Payment-specific data',
		example: {
			pixKey: '11999999999',
			qrCode: '00020126580014br.gov.bcb.pix...',
		},
	})
	paymentData:
		| { pixKey: string; qrCode: string }
		| { installments: number; lastDigits: string; cardBrand?: string }
		| { barcode: string; dueDate: Date };

	@ApiProperty({
		description: 'Creation date',
		example: '2025-10-22T00:00:00.000Z',
	})
	createdAt: Date;

	@ApiProperty({
		description: 'Last update date',
		example: '2025-10-22T00:00:00.000Z',
	})
	updatedAt: Date;
}
