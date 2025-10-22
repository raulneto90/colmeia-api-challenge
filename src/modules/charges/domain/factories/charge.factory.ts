import { BoletoCharge } from '../entities/boleto-charge.entity';
import { Charge } from '../entities/charge.entity';
import { CreditCardCharge } from '../entities/credit-card-charge.entity';
import { PixCharge } from '../entities/pix-charge.entity';
import type { ChargeStatus } from '../enums/charge-status.enum';
import { PaymentMethod } from '../enums/payment-method.enum';

export type CreatePixChargeParams = {
	id?: string;
	customerId: string;
	amount: number;
	currency?: string;
	status?: ChargeStatus;
	paymentMethod: PaymentMethod.PIX;
	paymentData: {
		pixKey: string;
		qrCode: string;
	};
	createdAt?: Date;
	updatedAt?: Date;
};

export type CreateCreditCardChargeParams = {
	id?: string;
	customerId: string;
	amount: number;
	currency?: string;
	status?: ChargeStatus;
	paymentMethod: PaymentMethod.CREDIT_CARD;
	paymentData: {
		installments: number;
		lastDigits: string;
		cardBrand?: string;
	};
	createdAt?: Date;
	updatedAt?: Date;
};

export type CreateBoletoChargeParams = {
	id?: string;
	customerId: string;
	amount: number;
	currency?: string;
	status?: ChargeStatus;
	paymentMethod: PaymentMethod.BOLETO;
	paymentData: {
		barcode: string;
		dueDate: Date;
	};
	createdAt?: Date;
	updatedAt?: Date;
};

type CreateChargeParams =
	| CreatePixChargeParams
	| CreateCreditCardChargeParams
	| CreateBoletoChargeParams;

export class ChargeFactory {
	static create(params: CreateChargeParams): Charge {
		switch (params.paymentMethod) {
			case PaymentMethod.PIX: {
				const pixParams = params as CreatePixChargeParams;
				return new PixCharge({
					id: pixParams.id,
					customerId: pixParams.customerId,
					amount: pixParams.amount,
					currency: pixParams.currency,
					status: pixParams.status,
					pixKey: pixParams.paymentData.pixKey,
					qrCode: pixParams.paymentData.qrCode,
					createdAt: pixParams.createdAt,
					updatedAt: pixParams.updatedAt,
				});
			}

			case PaymentMethod.CREDIT_CARD: {
				const creditCardParams = params as CreateCreditCardChargeParams;
				return new CreditCardCharge({
					id: creditCardParams.id,
					customerId: creditCardParams.customerId,
					amount: creditCardParams.amount,
					currency: creditCardParams.currency,
					status: creditCardParams.status,
					installments: creditCardParams.paymentData.installments,
					lastDigits: creditCardParams.paymentData.lastDigits,
					cardBrand: creditCardParams.paymentData.cardBrand,
					createdAt: creditCardParams.createdAt,
					updatedAt: creditCardParams.updatedAt,
				});
			}

			case PaymentMethod.BOLETO: {
				const boletoParams = params as CreateBoletoChargeParams;
				return new BoletoCharge({
					id: boletoParams.id,
					customerId: boletoParams.customerId,
					amount: boletoParams.amount,
					currency: boletoParams.currency,
					status: boletoParams.status,
					barcode: boletoParams.paymentData.barcode,
					dueDate: boletoParams.paymentData.dueDate,
					createdAt: boletoParams.createdAt,
					updatedAt: boletoParams.updatedAt,
				});
			}

			default:
				throw new Error(
					`Unsupported payment method: ${(params as CreateChargeParams).paymentMethod}`,
				);
		}
	}
}
