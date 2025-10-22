import { describe, expect, it } from 'vitest';
import { BoletoCharge } from '../entities/boleto-charge.entity';
import { CreditCardCharge } from '../entities/credit-card-charge.entity';
import { PixCharge } from '../entities/pix-charge.entity';
import { ChargeStatus } from '../enums/charge-status.enum';
import { PaymentMethod } from '../enums/payment-method.enum';
import { ChargeFactory } from './charge.factory';

describe('ChargeFactory', () => {
	describe('create PIX charge', () => {
		it('should create a PixCharge instance', () => {
			const charge = ChargeFactory.create({
				customerId: 'customer-123',
				amount: 100.5,
				paymentMethod: PaymentMethod.PIX,
				status: ChargeStatus.PENDING,
				paymentData: {
					pixKey: '11999999999',
					qrCode: '00020126580014br.gov.bcb.pix...',
				},
			});

			expect(charge).toBeInstanceOf(PixCharge);
			expect(charge.paymentMethod).toBe(PaymentMethod.PIX);
			expect((charge as PixCharge).pixKey).toBe('11999999999');
			expect((charge as PixCharge).qrCode).toBe('00020126580014br.gov.bcb.pix...');
		});
	});

	describe('create Credit Card charge', () => {
		it('should create a CreditCardCharge instance', () => {
			const charge = ChargeFactory.create({
				customerId: 'customer-123',
				amount: 300.0,
				paymentMethod: PaymentMethod.CREDIT_CARD,
				status: ChargeStatus.PENDING,
				paymentData: {
					installments: 3,
					lastDigits: '1234',
					cardBrand: 'Visa',
				},
			});

			expect(charge).toBeInstanceOf(CreditCardCharge);
			expect(charge.paymentMethod).toBe(PaymentMethod.CREDIT_CARD);
			expect((charge as CreditCardCharge).installments).toBe(3);
			expect((charge as CreditCardCharge).lastDigits).toBe('1234');
			expect((charge as CreditCardCharge).cardBrand).toBe('Visa');
		});

		it('should create a CreditCardCharge without card brand', () => {
			const charge = ChargeFactory.create({
				customerId: 'customer-123',
				amount: 300.0,
				paymentMethod: PaymentMethod.CREDIT_CARD,
				status: ChargeStatus.PENDING,
				paymentData: {
					installments: 3,
					lastDigits: '1234',
				},
			});

			expect(charge).toBeInstanceOf(CreditCardCharge);
			expect((charge as CreditCardCharge).cardBrand).toBeUndefined();
		});
	});

	describe('create Boleto charge', () => {
		it('should create a BoletoCharge instance', () => {
			const dueDate = new Date('2025-11-22');
			const charge = ChargeFactory.create({
				customerId: 'customer-123',
				amount: 200.0,
				paymentMethod: PaymentMethod.BOLETO,
				status: ChargeStatus.PENDING,
				paymentData: {
					barcode: '23793381286000000100641772301027659340000010000',
					dueDate,
				},
			});

			expect(charge).toBeInstanceOf(BoletoCharge);
			expect(charge.paymentMethod).toBe(PaymentMethod.BOLETO);
			expect((charge as BoletoCharge).barcode).toBe(
				'23793381286000000100641772301027659340000010000',
			);
			expect((charge as BoletoCharge).dueDate).toBe(dueDate);
		});
	});

	describe('error handling', () => {
		it('should throw error for unsupported payment method', () => {
			expect(() => {
				ChargeFactory.create({
					customerId: 'customer-123',
					amount: 100.0,
					// biome-ignore lint/suspicious/noExplicitAny: Testing invalid payment method
					paymentMethod: 'INVALID' as any,
					status: ChargeStatus.PENDING,
					// biome-ignore lint/suspicious/noExplicitAny: Testing invalid payment data
					paymentData: {} as any,
				});
			}).toThrow('Unsupported payment method');
		});
	});
});
