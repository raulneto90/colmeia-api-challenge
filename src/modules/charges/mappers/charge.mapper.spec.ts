import { describe, expect, it } from 'vitest';
import { BoletoCharge } from '../domain/entities/boleto-charge.entity';
import { CreditCardCharge } from '../domain/entities/credit-card-charge.entity';
import { PixCharge } from '../domain/entities/pix-charge.entity';
import { ChargeStatus } from '../domain/enums/charge-status.enum';
import { ChargeMapper } from './charge.mapper';

describe('ChargeMapper', () => {
	describe('toDomain - PIX', () => {
		it('should map Prisma PIX charge to domain entity', () => {
			const prismaCharge = {
				id: 'charge-123',
				customerId: 'customer-123',
				amount: 100.5,
				currency: 'BRL',
				paymentMethod: 'PIX',
				status: 'PENDING',
				createdAt: new Date('2025-01-01'),
				updatedAt: new Date('2025-01-01'),
				pixCharge: {
					id: 'pix-123',
					chargeId: 'charge-123',
					pixKey: '11999999999',
					qrCode: '00020126580014br.gov.bcb.pix...',
					createdAt: new Date('2025-01-01'),
					updatedAt: new Date('2025-01-01'),
				},
				// biome-ignore lint/suspicious/noExplicitAny: Mocking Prisma data
			} as any;

			const result = ChargeMapper.toDomain(prismaCharge);

			expect(result).toBeInstanceOf(PixCharge);
			expect(result.id).toBe('charge-123');
			expect(result.customerId).toBe('customer-123');
			expect(result.amount).toBe(100.5);
			expect((result as PixCharge).pixKey).toBe('11999999999');
			expect((result as PixCharge).qrCode).toBe('00020126580014br.gov.bcb.pix...');
		});
	});

	describe('toDomain - Credit Card', () => {
		it('should map Prisma Credit Card charge to domain entity with card brand', () => {
			const prismaCharge = {
				id: 'charge-456',
				customerId: 'customer-123',
				amount: 300.0,
				currency: 'BRL',
				paymentMethod: 'CREDIT_CARD',
				status: 'PAID',
				createdAt: new Date('2025-01-01'),
				updatedAt: new Date('2025-01-02'),
				creditCardCharge: {
					id: 'cc-456',
					chargeId: 'charge-456',
					installments: 3,
					lastDigits: '1234',
					cardBrand: 'Visa',
					createdAt: new Date('2025-01-01'),
					updatedAt: new Date('2025-01-02'),
				},
				// biome-ignore lint/suspicious/noExplicitAny: Mocking Prisma data
			} as any;

			const result = ChargeMapper.toDomain(prismaCharge);

			expect(result).toBeInstanceOf(CreditCardCharge);
			expect(result.id).toBe('charge-456');
			expect((result as CreditCardCharge).installments).toBe(3);
			expect((result as CreditCardCharge).lastDigits).toBe('1234');
			expect((result as CreditCardCharge).cardBrand).toBe('Visa');
		});

		it('should map Prisma Credit Card charge to domain entity without card brand', () => {
			const prismaCharge = {
				id: 'charge-456',
				customerId: 'customer-123',
				amount: 300.0,
				currency: 'BRL',
				paymentMethod: 'CREDIT_CARD',
				status: 'PAID',
				createdAt: new Date('2025-01-01'),
				updatedAt: new Date('2025-01-02'),
				creditCardCharge: {
					id: 'cc-456',
					chargeId: 'charge-456',
					installments: 3,
					lastDigits: '1234',
					cardBrand: null,
					createdAt: new Date('2025-01-01'),
					updatedAt: new Date('2025-01-02'),
				},
				// biome-ignore lint/suspicious/noExplicitAny: Mocking Prisma data
			} as any;

			const result = ChargeMapper.toDomain(prismaCharge);

			expect(result).toBeInstanceOf(CreditCardCharge);
			expect((result as CreditCardCharge).cardBrand).toBeUndefined();
		});
	});

	describe('toDomain - Boleto', () => {
		it('should map Prisma Boleto charge to domain entity', () => {
			const prismaCharge = {
				id: 'charge-789',
				customerId: 'customer-123',
				amount: 200.0,
				currency: 'BRL',
				paymentMethod: 'BOLETO',
				status: 'EXPIRED',
				createdAt: new Date('2025-01-01'),
				updatedAt: new Date('2025-01-01'),
				boletoCharge: {
					id: 'boleto-789',
					chargeId: 'charge-789',
					barcode: '23793381286000000100641772301027659340000010000',
					dueDate: new Date('2025-11-22'),
					createdAt: new Date('2025-01-01'),
					updatedAt: new Date('2025-01-01'),
				},
				// biome-ignore lint/suspicious/noExplicitAny: Mocking Prisma data
			} as any;

			const result = ChargeMapper.toDomain(prismaCharge);

			expect(result).toBeInstanceOf(BoletoCharge);
			expect(result.id).toBe('charge-789');
			expect((result as BoletoCharge).barcode).toBe(
				'23793381286000000100641772301027659340000010000',
			);
			expect((result as BoletoCharge).dueDate).toEqual(new Date('2025-11-22'));
		});
	});

	describe('toResponseDto - PIX', () => {
		it('should map PIX charge to response DTO', () => {
			const pixCharge = new PixCharge({
				id: 'charge-123',
				customerId: 'customer-123',
				amount: 100.5,
				currency: 'BRL',
				status: ChargeStatus.PENDING,
				pixKey: '11999999999',
				qrCode: '00020126580014br.gov.bcb.pix...',
				createdAt: new Date('2025-01-01'),
				updatedAt: new Date('2025-01-01'),
			});

			const result = ChargeMapper.toResponseDto(pixCharge);

			expect(result.id).toBe('charge-123');
			expect(result.customerId).toBe('customer-123');
			expect(result.amount).toBe(100.5);
			expect(result.currency).toBe('BRL');
			expect(result.status).toBe(ChargeStatus.PENDING);
			expect(result.paymentData).toEqual({
				pixKey: '11999999999',
				qrCode: '00020126580014br.gov.bcb.pix...',
			});
		});
	});

	describe('toResponseDto - Credit Card', () => {
		it('should map Credit Card charge to response DTO with card brand', () => {
			const creditCardCharge = new CreditCardCharge({
				id: 'charge-456',
				customerId: 'customer-123',
				amount: 300.0,
				currency: 'BRL',
				status: ChargeStatus.PAID,
				installments: 3,
				lastDigits: '1234',
				cardBrand: 'Visa',
				createdAt: new Date('2025-01-01'),
				updatedAt: new Date('2025-01-02'),
			});

			const result = ChargeMapper.toResponseDto(creditCardCharge);

			expect(result.id).toBe('charge-456');
			expect(result.customerId).toBe('customer-123');
			expect(result.amount).toBe(300.0);
			expect(result.status).toBe(ChargeStatus.PAID);
			expect(result.paymentData).toEqual({
				installments: 3,
				lastDigits: '1234',
				cardBrand: 'Visa',
			});
		});

		it('should map Credit Card charge to response DTO without card brand', () => {
			const creditCardCharge = new CreditCardCharge({
				id: 'charge-456',
				customerId: 'customer-123',
				amount: 300.0,
				currency: 'BRL',
				status: ChargeStatus.PAID,
				installments: 3,
				lastDigits: '1234',
				createdAt: new Date('2025-01-01'),
				updatedAt: new Date('2025-01-02'),
			});

			const result = ChargeMapper.toResponseDto(creditCardCharge);

			expect(result.id).toBe('charge-456');
			expect(result.paymentData).toEqual({
				installments: 3,
				lastDigits: '1234',
				cardBrand: undefined,
			});
		});
	});

	describe('toResponseDto - Boleto', () => {
		it('should map Boleto charge to response DTO', () => {
			const boletoCharge = new BoletoCharge({
				id: 'charge-789',
				customerId: 'customer-123',
				amount: 200.0,
				currency: 'BRL',
				status: ChargeStatus.EXPIRED,
				barcode: '23793381286000000100641772301027659340000010000',
				dueDate: new Date('2025-11-22'),
				createdAt: new Date('2025-01-01'),
				updatedAt: new Date('2025-01-01'),
			});

			const result = ChargeMapper.toResponseDto(boletoCharge);

			expect(result.id).toBe('charge-789');
			expect(result.customerId).toBe('customer-123');
			expect(result.amount).toBe(200.0);
			expect(result.status).toBe(ChargeStatus.EXPIRED);
			expect(result.paymentData).toEqual({
				barcode: '23793381286000000100641772301027659340000010000',
				dueDate: new Date('2025-11-22'),
			});
		});
	});
});
