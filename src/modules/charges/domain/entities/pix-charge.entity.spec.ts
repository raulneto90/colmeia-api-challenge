import { describe, expect, it } from 'vitest';
import { ChargeStatus } from '../enums/charge-status.enum';
import { PaymentMethod } from '../enums/payment-method.enum';
import { PixCharge } from './pix-charge.entity';

describe('PixCharge Entity', () => {
	it('should create a PIX charge with all required fields', () => {
		const charge = new PixCharge({
			customerId: 'customer-123',
			amount: 100.5,
			pixKey: '11999999999',
			qrCode: '00020126580014br.gov.bcb.pix...',
		});

		expect(charge.id).toBeDefined();
		expect(charge.customerId).toBe('customer-123');
		expect(charge.amount).toBe(100.5);
		expect(charge.currency).toBe('BRL');
		expect(charge.paymentMethod).toBe(PaymentMethod.PIX);
		expect(charge.status).toBe(ChargeStatus.PENDING);
		expect(charge.pixKey).toBe('11999999999');
		expect(charge.qrCode).toBe('00020126580014br.gov.bcb.pix...');
		expect(charge.createdAt).toBeInstanceOf(Date);
		expect(charge.updatedAt).toBeInstanceOf(Date);
	});

	it('should create a PIX charge with custom currency', () => {
		const charge = new PixCharge({
			customerId: 'customer-123',
			amount: 100.5,
			currency: 'USD',
			pixKey: '11999999999',
			qrCode: '00020126580014br.gov.bcb.pix...',
		});

		expect(charge.currency).toBe('USD');
	});

	it('should create a PIX charge with custom status', () => {
		const charge = new PixCharge({
			customerId: 'customer-123',
			amount: 100.5,
			status: ChargeStatus.PAID,
			pixKey: '11999999999',
			qrCode: '00020126580014br.gov.bcb.pix...',
		});

		expect(charge.status).toBe(ChargeStatus.PAID);
	});
});
