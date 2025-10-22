import type { ChargeStatus } from '../../enums/charge-status.enum';
import { PaymentMethod } from '../../enums/payment-method.enum';

export interface CreatePixChargeDto {
	id?: string;
	customerId: string;
	amount: number;
	currency?: string;
	paymentMethod: PaymentMethod.PIX;
	status?: ChargeStatus;
	paymentData: {
		pixKey: string;
		qrCode: string;
	};
	createdAt?: Date;
	updatedAt?: Date;
}
