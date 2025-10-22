import { z } from 'zod';

export const createCreditCardChargeValidation = z.object({
	customerId: z.uuid('Customer ID must be a valid UUID'),
	amount: z.number().positive('Amount must be positive'),
	currency: z.string().default('BRL').optional(),
	paymentMethod: z.literal('CREDIT_CARD'),
	paymentData: z.object({
		installments: z
			.number()
			.int('Installments must be an integer')
			.min(1, 'Installments must be at least 1')
			.max(12, 'Installments cannot exceed 12'),
		lastDigits: z.string().length(4, 'Last digits must have exactly 4 characters'),
		cardBrand: z.string().optional(),
	}),
});

export type CreateCreditCardChargeValidation = z.infer<typeof createCreditCardChargeValidation>;
