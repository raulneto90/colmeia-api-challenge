import { z } from 'zod';

export const createPixChargeValidation = z.object({
	customerId: z.uuid('Customer ID must be a valid UUID'),
	amount: z.number().positive('Amount must be positive'),
	currency: z.string().default('BRL').optional(),
	paymentMethod: z.literal('PIX'),
	paymentData: z.object({
		pixKey: z.string().min(1, 'PIX key is required'),
		qrCode: z.string().min(1, 'QR Code is required'),
	}),
});

export type CreatePixChargeValidation = z.infer<typeof createPixChargeValidation>;
