import type { ChargeStatus } from '../../enums/charge-status.enum';
import type { PaymentMethod } from '../../enums/payment-method.enum';

export interface CreateChargeDto {
	id?: string;
	customerId: string;
	amount: number;
	currency?: string;
	paymentMethod: PaymentMethod;
	status?: ChargeStatus;
	paymentData:
		| {
				pixKey: string;
				qrCode: string;
		  }
		| {
				barcode: string;
				dueDate: Date;
		  }
		| {
				installments: number;
				lastDigits: string;
				cardBrand?: string;
		  };
	createdAt?: Date;
	updatedAt?: Date;
}
