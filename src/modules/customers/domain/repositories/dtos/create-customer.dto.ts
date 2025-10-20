export interface CreateCustomerDTO {
	name: string;
	email: string;
	phone: string;
	document: string;
	createdAt?: Date;
	updatedAt?: Date;
}
