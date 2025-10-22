import { beforeEach, describe, expect, it, vi } from 'vitest';
import { AppError } from '../../../../config/errors/app.error';
import { Customer } from '../../../customers/domain/entities/customer.entity';
import { CustomersRepository } from '../../../customers/domain/repositories/customers.repository';
import { ChargeStatus } from '../../domain/enums/charge-status.enum';
import { PaymentMethod } from '../../domain/enums/payment-method.enum';
import { ChargesRepository } from '../../domain/repositories/charges.repository';
import { CreateChargeUseCase } from './create-charge.usecase';

describe('CreateChargeUseCase', () => {
	let useCase: CreateChargeUseCase;
	let chargesRepository: ChargesRepository;
	let customersRepository: CustomersRepository;

	beforeEach(() => {
		chargesRepository = {
			create: vi.fn(),
		} as unknown as ChargesRepository;

		customersRepository = {
			findByFilters: vi.fn(),
		} as unknown as CustomersRepository;

		useCase = new CreateChargeUseCase(chargesRepository, customersRepository);
	});

	describe('create PIX charge', () => {
		it('should create a PIX charge when customer exists', async () => {
			const mockCustomer = new Customer({
				name: 'John Doe',
				email: 'john@example.com',
				phone: '11999999999',
				document: '12345678901',
			});

			const mockCharge = {
				id: 'charge-123',
				customerId: mockCustomer.id,
				amount: 100.5,
				currency: 'BRL',
				paymentMethod: PaymentMethod.PIX,
				status: ChargeStatus.PENDING,
				pixKey: '11999999999',
				qrCode: '00020126580014br.gov.bcb.pix...',
				createdAt: new Date(),
				updatedAt: new Date(),
			};

			vi.spyOn(customersRepository, 'findByFilters').mockResolvedValue(mockCustomer);
			vi.spyOn(chargesRepository, 'create').mockResolvedValue(mockCharge);

			const result = await useCase.execute({
				customerId: mockCustomer.id,
				amount: 100.5,
				paymentMethod: PaymentMethod.PIX,
				status: ChargeStatus.PENDING,
				paymentData: {
					pixKey: '11999999999',
					qrCode: '00020126580014br.gov.bcb.pix...',
				},
			});

			expect(customersRepository.findByFilters).toHaveBeenCalledWith({
				id: mockCustomer.id,
			});
			expect(chargesRepository.create).toHaveBeenCalled();
			expect(result).toEqual(mockCharge);
		});

		it('should throw error when customer does not exist', async () => {
			vi.spyOn(customersRepository, 'findByFilters').mockResolvedValue(null);

			await expect(
				useCase.execute({
					customerId: 'non-existent-customer',
					amount: 100.5,
					paymentMethod: PaymentMethod.PIX,
					status: ChargeStatus.PENDING,
					paymentData: {
						pixKey: '11999999999',
						qrCode: '00020126580014br.gov.bcb.pix...',
					},
				}),
			).rejects.toThrow(AppError);

			await expect(
				useCase.execute({
					customerId: 'non-existent-customer',
					amount: 100.5,
					paymentMethod: PaymentMethod.PIX,
					status: ChargeStatus.PENDING,
					paymentData: {
						pixKey: '11999999999',
						qrCode: '00020126580014br.gov.bcb.pix...',
					},
				}),
			).rejects.toThrow('Customer not found');

			expect(chargesRepository.create).not.toHaveBeenCalled();
		});
	});

	describe('create Credit Card charge', () => {
		it('should create a Credit Card charge when customer exists', async () => {
			const mockCustomer = new Customer({
				name: 'John Doe',
				email: 'john@example.com',
				phone: '11999999999',
				document: '12345678901',
			});

			const mockCharge = {
				id: 'charge-123',
				customerId: mockCustomer.id,
				amount: 300.0,
				currency: 'BRL',
				paymentMethod: PaymentMethod.CREDIT_CARD,
				status: ChargeStatus.PENDING,
				installments: 3,
				lastDigits: '1234',
				cardBrand: 'Visa',
				createdAt: new Date(),
				updatedAt: new Date(),
			};

			vi.spyOn(customersRepository, 'findByFilters').mockResolvedValue(mockCustomer);
			vi.spyOn(chargesRepository, 'create').mockResolvedValue(mockCharge);

			const result = await useCase.execute({
				customerId: mockCustomer.id,
				amount: 300.0,
				paymentMethod: PaymentMethod.CREDIT_CARD,
				status: ChargeStatus.PENDING,
				paymentData: {
					installments: 3,
					lastDigits: '1234',
					cardBrand: 'Visa',
				},
			});

			expect(result).toEqual(mockCharge);
		});
	});

	describe('create Boleto charge', () => {
		it('should create a Boleto charge when customer exists', async () => {
			const mockCustomer = new Customer({
				name: 'John Doe',
				email: 'john@example.com',
				phone: '11999999999',
				document: '12345678901',
			});

			const dueDate = new Date('2025-11-22');
			const mockCharge = {
				id: 'charge-123',
				customerId: mockCustomer.id,
				amount: 200.0,
				currency: 'BRL',
				paymentMethod: PaymentMethod.BOLETO,
				status: ChargeStatus.PENDING,
				barcode: '23793381286000000100641772301027659340000010000',
				dueDate,
				createdAt: new Date(),
				updatedAt: new Date(),
			};

			vi.spyOn(customersRepository, 'findByFilters').mockResolvedValue(mockCustomer);
			vi.spyOn(chargesRepository, 'create').mockResolvedValue(mockCharge);

			const result = await useCase.execute({
				customerId: mockCustomer.id,
				amount: 200.0,
				paymentMethod: PaymentMethod.BOLETO,
				status: ChargeStatus.PENDING,
				paymentData: {
					barcode: '23793381286000000100641772301027659340000010000',
					dueDate,
				},
			});

			expect(result).toEqual(mockCharge);
		});
	});
});
