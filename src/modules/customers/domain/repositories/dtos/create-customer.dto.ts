export interface CreateCustomerDTO {
	id: string;
	name: string;
	email: string;
	phone: string;
	document: string;
	createdAt?: Date;
	updatedAt?: Date;
}
