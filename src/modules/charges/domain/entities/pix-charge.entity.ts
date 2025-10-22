import type { ChargeStatus } from '../enums/charge-status.enum';
import { PaymentMethod } from '../enums/payment-method.enum';
import { Charge } from './charge.entity';

interface ConstructorParams {
	id?: string;
	customerId: string;
	amount: number;
	currency?: string;
	status?: ChargeStatus;
	pixKey: string;
	qrCode: string;
	createdAt?: Date;
	updatedAt?: Date;
}

export class PixCharge extends Charge {
	readonly pixKey: string;
	readonly qrCode: string;

	constructor(params: ConstructorParams) {
		super({
			id: params.id,
			customerId: params.customerId,
			amount: params.amount,
			currency: params.currency,
			paymentMethod: PaymentMethod.PIX,
			status: params.status,
			createdAt: params.createdAt,
			updatedAt: params.updatedAt,
		});

		this.pixKey = params.pixKey;
		this.qrCode = params.qrCode;
	}
}
