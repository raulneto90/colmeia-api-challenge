import { z } from 'zod';

export const createBoletoChargeValidation = z.object({
	customerId: z.uuid('Customer ID must be a valid UUID'),
	amount: z.number().positive('Amount must be positive'),
	currency: z.string().default('BRL').optional(),
	paymentMethod: z.literal('BOLETO'),
	paymentData: z.object({
		barcode: z.string().min(1, 'Barcode is required'),
		dueDate: z
			.date()
			.or(z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Invalid date format'))
			.transform(val => new Date(val)),
	}),
});

export type CreateBoletoChargeValidation = z.infer<typeof createBoletoChargeValidation>;
