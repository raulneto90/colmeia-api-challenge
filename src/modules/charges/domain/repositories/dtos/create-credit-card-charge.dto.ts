import type { ChargeStatus } from '../../enums/charge-status.enum';
import { PaymentMethod } from '../../enums/payment-method.enum';

export interface CreateCreditCardChargeDto {
	id?: string;
	customerId: string;
	amount: number;
	currency?: string;
	paymentMethod: PaymentMethod.CREDIT_CARD;
	status?: ChargeStatus;
	paymentData: {
		installments: number;
		lastDigits: string;
		cardBrand?: string;
	};
	createdAt?: Date;
	updatedAt?: Date;
}
