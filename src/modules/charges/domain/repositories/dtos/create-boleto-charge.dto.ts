import type { ChargeStatus } from '../../enums/charge-status.enum';
import { PaymentMethod } from '../../enums/payment-method.enum';

export interface CreateBoletoChargeDto {
	id?: string;
	customerId: string;
	amount: number;
	currency?: string;
	paymentMethod: PaymentMethod.BOLETO;
	status?: ChargeStatus;
	paymentData: {
		barcode: string;
		dueDate: Date;
	};
	createdAt?: Date;
	updatedAt?: Date;
}
