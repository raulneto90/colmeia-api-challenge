import { ApiProperty } from '@nestjs/swagger';

export class PixPaymentData {
	@ApiProperty({
		description: 'PIX key',
		example: '11999999999',
	})
	pixKey: string;

	@ApiProperty({
		description: 'PIX QR Code',
		example: '00020126580014br.gov.bcb.pix...',
	})
	qrCode: string;
}

export class CreditCardPaymentData {
	@ApiProperty({
		description: 'Number of installments',
		example: 3,
		minimum: 1,
		maximum: 12,
	})
	installments: number;

	@ApiProperty({
		description: 'Last 4 digits of the card',
		example: '1234',
		minLength: 4,
		maxLength: 4,
	})
	lastDigits: string;

	@ApiProperty({
		description: 'Card brand',
		example: 'Visa',
		required: false,
	})
	cardBrand?: string;
}

export class BoletoPaymentData {
	@ApiProperty({
		description: 'Boleto barcode',
		example: '23793381286000000100641772301027659340000010000',
	})
	barcode: string;

	@ApiProperty({
		description: 'Due date',
		example: '2025-11-22',
	})
	dueDate: string;
}

export class CreateChargeRequestDTO {
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
		default: 'BRL',
		required: false,
	})
	currency?: string;

	@ApiProperty({
		description: 'Payment method type',
		enum: ['PIX', 'CREDIT_CARD', 'BOLETO'],
		example: 'PIX',
	})
	paymentMethod: 'PIX' | 'CREDIT_CARD' | 'BOLETO';

	@ApiProperty({
		description: 'Payment-specific data (varies by payment method)',
		oneOf: [
			{ $ref: '#/components/schemas/PixPaymentData' },
			{ $ref: '#/components/schemas/CreditCardPaymentData' },
			{ $ref: '#/components/schemas/BoletoPaymentData' },
		],
		examples: {
			pix: {
				value: {
					pixKey: '11999999999',
					qrCode: '00020126580014br.gov.bcb.pix...',
				},
			},
			creditCard: {
				value: {
					installments: 3,
					lastDigits: '1234',
					cardBrand: 'Visa',
				},
			},
			boleto: {
				value: {
					barcode: '23793381286000000100641772301027659340000010000',
					dueDate: '2025-11-22',
				},
			},
		},
	})
	paymentData: PixPaymentData | CreditCardPaymentData | BoletoPaymentData;
}
