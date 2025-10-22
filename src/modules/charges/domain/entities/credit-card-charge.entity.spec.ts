import { describe, expect, it } from 'vitest';
import { ChargeStatus } from '../enums/charge-status.enum';
import { PaymentMethod } from '../enums/payment-method.enum';
import { CreditCardCharge } from './credit-card-charge.entity';

describe('CreditCardCharge Entity', () => {
	it('should create a credit card charge with all required fields', () => {
		const charge = new CreditCardCharge({
			customerId: 'customer-123',
			amount: 300.0,
			installments: 3,
			lastDigits: '1234',
		});

		expect(charge.id).toBeDefined();
		expect(charge.customerId).toBe('customer-123');
		expect(charge.amount).toBe(300.0);
		expect(charge.currency).toBe('BRL');
		expect(charge.paymentMethod).toBe(PaymentMethod.CREDIT_CARD);
		expect(charge.status).toBe(ChargeStatus.PENDING);
		expect(charge.installments).toBe(3);
		expect(charge.lastDigits).toBe('1234');
		expect(charge.cardBrand).toBeUndefined();
	});

	it('should create a credit card charge with card brand', () => {
		const charge = new CreditCardCharge({
			customerId: 'customer-123',
			amount: 300.0,
			installments: 3,
			lastDigits: '1234',
			cardBrand: 'Visa',
		});

		expect(charge.cardBrand).toBe('Visa');
	});
});
