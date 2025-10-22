import { describe, expect, it } from 'vitest';
import { Customer } from './customer.entity';

describe('Customer Entity', () => {
	it('should create a customer with all required fields', () => {
		const customer = new Customer({
			name: 'John Doe',
			email: 'john@example.com',
			phone: '+5511999999999',
			document: '12345678901',
		});

		expect(customer.id).toBeDefined();
		expect(customer.name).toBe('John Doe');
		expect(customer.email).toBe('john@example.com');
		expect(customer.phone).toBe('+5511999999999');
		expect(customer.document).toBe('12345678901');
		expect(customer.createdAt).toBeInstanceOf(Date);
		expect(customer.updatedAt).toBeInstanceOf(Date);
	});

	it('should create a customer with provided id', () => {
		const customId = 'custom-uuid-123';
		const customer = new Customer({
			id: customId,
			name: 'John Doe',
			email: 'john@example.com',
			phone: '+5511999999999',
			document: '12345678901',
		});

		expect(customer.id).toBe(customId);
	});

	it('should create a customer with provided timestamps', () => {
		const createdAt = new Date('2024-01-01');
		const updatedAt = new Date('2024-01-02');

		const customer = new Customer({
			name: 'John Doe',
			email: 'john@example.com',
			phone: '+5511999999999',
			document: '12345678901',
			createdAt,
			updatedAt,
		});

		expect(customer.createdAt).toBe(createdAt);
		expect(customer.updatedAt).toBe(updatedAt);
	});
});
