import { describe, expect, it } from 'vitest';
import { ChargeStatus } from '../enums/charge-status.enum';
import { PaymentMethod } from '../enums/payment-method.enum';
import { BoletoCharge } from './boleto-charge.entity';

describe('BoletoCharge Entity', () => {
	it('should create a boleto charge with all required fields', () => {
		const dueDate = new Date('2025-11-22');
		const charge = new BoletoCharge({
			customerId: 'customer-123',
			amount: 200.0,
			barcode: '23793381286000000100641772301027659340000010000',
			dueDate,
		});

		expect(charge.id).toBeDefined();
		expect(charge.customerId).toBe('customer-123');
		expect(charge.amount).toBe(200.0);
		expect(charge.currency).toBe('BRL');
		expect(charge.paymentMethod).toBe(PaymentMethod.BOLETO);
		expect(charge.status).toBe(ChargeStatus.PENDING);
		expect(charge.barcode).toBe('23793381286000000100641772301027659340000010000');
		expect(charge.dueDate).toBe(dueDate);
	});
});
