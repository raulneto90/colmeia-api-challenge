interface ConstructorParams {
	id?: string;
	name: string;
	email: string;
	phone: string;
	document: string;
	createdAt?: Date;
	updatedAt?: Date;
}

export class Customer {
	readonly id: string;
	readonly name: string;
	readonly email: string;
	readonly phone: string;
	readonly document: string;
	readonly createdAt: Date;
	readonly updatedAt: Date;

	constructor(params: ConstructorParams) {
		this.id = params.id ?? crypto.randomUUID();
		this.name = params.name;
		this.email = params.email;
		this.phone = params.phone;
		this.document = params.document;
		this.createdAt = params.createdAt ?? new Date();
		this.updatedAt = params.updatedAt ?? new Date();
	}
}
