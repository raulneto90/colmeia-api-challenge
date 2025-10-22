import { describe, expect, it } from 'vitest';
import { Customer } from '../domain/entities/customer.entity';
import { CustomerMapper } from './customer.mapper';

describe('CustomerMapper', () => {
	describe('toDomain', () => {
		it('should map persistence data to domain entity', () => {
			const persistenceData = {
				id: 'customer-123',
				name: 'John Doe',
				email: 'john@example.com',
				phone: '11999999999',
				document: '12345678901',
				createdAt: new Date('2025-01-01'),
				updatedAt: new Date('2025-01-01'),
			};

			const result = CustomerMapper.toDomain(persistenceData);

			expect(result).toBeInstanceOf(Customer);
			expect(result.id).toBe('customer-123');
			expect(result.name).toBe('John Doe');
			expect(result.email).toBe('john@example.com');
			expect(result.phone).toBe('11999999999');
			expect(result.document).toBe('12345678901');
			expect(result.createdAt).toEqual(new Date('2025-01-01'));
			expect(result.updatedAt).toEqual(new Date('2025-01-01'));
		});
	});

	describe('toPersistence', () => {
		it('should map domain entity to persistence data', () => {
			const customer = new Customer({
				id: 'customer-456',
				name: 'Jane Smith',
				email: 'jane@example.com',
				phone: '11988888888',
				document: '98765432100',
				createdAt: new Date('2025-02-01'),
				updatedAt: new Date('2025-02-02'),
			});

			const result = CustomerMapper.toPersistence(customer);

			expect(result).toEqual({
				id: 'customer-456',
				name: 'Jane Smith',
				email: 'jane@example.com',
				phone: '11988888888',
				document: '98765432100',
				createdAt: new Date('2025-02-01'),
				updatedAt: new Date('2025-02-02'),
			});
		});
	});
});
