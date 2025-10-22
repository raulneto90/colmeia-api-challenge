import type { ChargeStatus } from '../enums/charge-status.enum';
import { PaymentMethod } from '../enums/payment-method.enum';
import { Charge } from './charge.entity';

interface ConstructorParams {
	id?: string;
	customerId: string;
	amount: number;
	currency?: string;
	status?: ChargeStatus;
	installments: number;
	lastDigits: string;
	cardBrand?: string;
	createdAt?: Date;
	updatedAt?: Date;
}

export class CreditCardCharge extends Charge {
	readonly installments: number;
	readonly lastDigits: string;
	readonly cardBrand?: string;

	constructor(params: ConstructorParams) {
		super({
			id: params.id,
			customerId: params.customerId,
			amount: params.amount,
			currency: params.currency,
			paymentMethod: PaymentMethod.CREDIT_CARD,
			status: params.status,
			createdAt: params.createdAt,
			updatedAt: params.updatedAt,
		});

		this.installments = params.installments;
		this.lastDigits = params.lastDigits;
		this.cardBrand = params.cardBrand;
	}
}
