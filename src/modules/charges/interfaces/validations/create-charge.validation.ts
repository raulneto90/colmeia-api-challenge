import { z } from 'zod';
import { createBoletoChargeValidation } from './create-boleto-charge.validation';
import { createCreditCardChargeValidation } from './create-credit-card-charge.validation';
import { createPixChargeValidation } from './create-pix-charge.validation';

export const createChargeValidation = z.discriminatedUnion('paymentMethod', [
	createPixChargeValidation,
	createCreditCardChargeValidation,
	createBoletoChargeValidation,
]);

export type CreateChargeValidation = z.infer<typeof createChargeValidation>;
