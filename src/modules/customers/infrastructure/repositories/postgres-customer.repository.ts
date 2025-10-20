import { Injectable } from '@nestjs/common';
import { PrismaService } from '@src/modules/common/services/prisma.service';
import { Customer } from 'generated/prisma';
import { CustomersRepository } from '../../domain/repositories/customers.repository';
import { CreateCustomerDTO } from '../../domain/repositories/dtos/create-customer.dto';

@Injectable()
export class PostgresCustomerRepository implements CustomersRepository {
	constructor(private readonly prismaService: PrismaService) {}

	async create(data: CreateCustomerDTO): Promise<Customer> {
		return this.prismaService.customer.create({
			data,
		});
	}

	async findByFilters(filters: Partial<Customer>): Promise<Customer | null> {
		return this.prismaService.customer.findFirst({
			where: {
				OR: [{ email: filters.email }, { document: filters.document }],
			},
		});
	}
}
