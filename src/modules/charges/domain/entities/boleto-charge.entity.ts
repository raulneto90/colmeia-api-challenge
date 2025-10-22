import type { ChargeStatus } from '../enums/charge-status.enum';
import { PaymentMethod } from '../enums/payment-method.enum';
import { Charge } from './charge.entity';

interface ConstructorParams {
	id?: string;
	customerId: string;
	amount: number;
	currency?: string;
	status?: ChargeStatus;
	barcode: string;
	dueDate: Date;
	createdAt?: Date;
	updatedAt?: Date;
}

export class BoletoCharge extends Charge {
	readonly barcode: string;
	readonly dueDate: Date;

	constructor(params: ConstructorParams) {
		super({
			id: params.id,
			customerId: params.customerId,
			amount: params.amount,
			currency: params.currency,
			paymentMethod: PaymentMethod.BOLETO,
			status: params.status,
			createdAt: params.createdAt,
			updatedAt: params.updatedAt,
		});

		this.barcode = params.barcode;
		this.dueDate = params.dueDate;
	}
}
