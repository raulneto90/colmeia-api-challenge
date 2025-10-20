import { Customer } from 'generated/prisma';
import { Customer as CustomerEntity } from '../domain/entities/customer.entity';

export class CustomerMapper {
	static toPersistence(entity: CustomerEntity): Customer {
		return {
			id: entity.id,
			name: entity.name,
			email: entity.email,
			document: entity.document,
			phone: entity.phone,
			createdAt: entity.createdAt,
			updatedAt: entity.updatedAt,
		};
	}

	static toDomain(raw: Customer): CustomerEntity {
		return new CustomerEntity({
			id: raw.id,
			name: raw.name,
			email: raw.email,
			document: raw.document,
			phone: raw.phone,
			createdAt: raw.createdAt,
			updatedAt: raw.updatedAt,
		});
	}
}
