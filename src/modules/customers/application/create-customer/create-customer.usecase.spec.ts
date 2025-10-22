import { beforeEach, describe, expect, it, vi } from 'vitest';
import { AppError } from '../../../../config/errors/app.error';
import { CustomersRepository } from '../../domain/repositories/customers.repository';
import { CreateCustomerUseCase } from './create-customer.usecase';

describe('CreateCustomerUseCase', () => {
	let useCase: CreateCustomerUseCase;
	let customersRepository: CustomersRepository;

	beforeEach(() => {
		customersRepository = {
			create: vi.fn(),
			findByFilters: vi.fn(),
		} as unknown as CustomersRepository;

		useCase = new CreateCustomerUseCase(customersRepository);
	});

	describe('execute', () => {
		it('should create a customer when email does not exist', async () => {
			const createCustomerDto = {
				id: 'customer-123',
				name: 'John Doe',
				email: 'john@example.com',
				phone: '11999999999',
				document: '12345678901',
			};

			const mockCustomer = {
				id: 'customer-123',
				name: 'John Doe',
				email: 'john@example.com',
				phone: '11999999999',
				document: '12345678901',
				createdAt: new Date(),
				updatedAt: new Date(),
			};

			vi.spyOn(customersRepository, 'findByFilters').mockResolvedValue(null);
			vi.spyOn(customersRepository, 'create').mockResolvedValue(mockCustomer);

			const result = await useCase.execute(createCustomerDto);

			expect(customersRepository.findByFilters).toHaveBeenCalledWith({
				email: 'john@example.com',
				document: '12345678901',
			});
			expect(customersRepository.create).toHaveBeenCalled();
			expect(result).toEqual(mockCustomer);
		});

		it('should throw error when email already exists', async () => {
			const createCustomerDto = {
				id: 'new-customer',
				name: 'John Doe',
				email: 'existing@example.com',
				phone: '11999999999',
				document: '12345678901',
			};

			const existingCustomer = {
				id: 'existing-customer',
				name: 'Existing Customer',
				email: 'existing@example.com',
				phone: '11888888888',
				document: '98765432109',
				createdAt: new Date(),
				updatedAt: new Date(),
			};

			vi.spyOn(customersRepository, 'findByFilters').mockResolvedValue(existingCustomer);

			await expect(useCase.execute(createCustomerDto)).rejects.toThrow(AppError);

			await expect(useCase.execute(createCustomerDto)).rejects.toThrow(
				'Customer with given email or document already exists',
			);

			expect(customersRepository.create).not.toHaveBeenCalled();
		});
	});
});
