import { Customer } from '../entities/customer.entity';
import { CreateCustomerDTO } from './dtos/create-customer.dto';

export interface CustomersRepository {
	create(data: CreateCustomerDTO): Promise<void>;
	findByFilters(filters: Partial<Customer>): Promise<Customer | null>;
}
