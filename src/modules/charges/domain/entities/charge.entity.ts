import type { ChargeStatus } from '../enums/charge-status.enum';
import type { PaymentMethod } from '../enums/payment-method.enum';

interface ConstructorParams {
	id?: string;
	customerId: string;
	amount: number;
	currency?: string;
	paymentMethod: PaymentMethod;
	status?: ChargeStatus;
	createdAt?: Date;
	updatedAt?: Date;
}

export class Charge {
	readonly id: string;
	readonly customerId: string;
	readonly amount: number;
	readonly currency: string;
	readonly paymentMethod: PaymentMethod;
	readonly status: ChargeStatus;
	readonly createdAt: Date;
	readonly updatedAt: Date;

	constructor(params: ConstructorParams) {
		this.id = params.id ?? crypto.randomUUID();
		this.customerId = params.customerId;
		this.amount = params.amount;
		this.currency = params.currency ?? 'BRL';
		this.paymentMethod = params.paymentMethod;
		this.status = params.status ?? ('PENDING' as ChargeStatus);
		this.createdAt = params.createdAt ?? new Date();
		this.updatedAt = params.updatedAt ?? new Date();
	}
}
