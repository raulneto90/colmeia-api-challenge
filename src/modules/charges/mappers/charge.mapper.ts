import type {
	BoletoCharge as PrismaBoletoCharge,
	Charge as PrismaCharge,
	CreditCardCharge as PrismaCreditCardCharge,
	PixCharge as PrismaPixCharge,
} from 'generated/prisma';
import { BoletoCharge } from '../domain/entities/boleto-charge.entity';
import type { Charge } from '../domain/entities/charge.entity';
import { CreditCardCharge } from '../domain/entities/credit-card-charge.entity';
import { PixCharge } from '../domain/entities/pix-charge.entity';
import { ChargeStatus } from '../domain/enums/charge-status.enum';
import type { CreateChargeResponseDTO } from '../interfaces/dtos/create-charge-response.dto';

type PrismaChargeWithRelations = PrismaCharge & {
	pixCharge?: PrismaPixCharge | null;
	creditCardCharge?: PrismaCreditCardCharge | null;
	boletoCharge?: PrismaBoletoCharge | null;
};

export class ChargeMapper {
	static toDomain(raw: PrismaChargeWithRelations): Charge {
		const baseData = {
			id: raw.id,
			customerId: raw.customerId,
			amount: Number(raw.amount),
			currency: raw.currency,
			status: raw.status as ChargeStatus,
			createdAt: raw.createdAt,
			updatedAt: raw.updatedAt,
		};

		if (raw.paymentMethod === 'PIX' && raw.pixCharge) {
			return new PixCharge({
				...baseData,
				pixKey: raw.pixCharge.pixKey,
				qrCode: raw.pixCharge.qrCode,
			});
		}

		if (raw.paymentMethod === 'CREDIT_CARD' && raw.creditCardCharge) {
			return new CreditCardCharge({
				...baseData,
				installments: raw.creditCardCharge.installments,
				lastDigits: raw.creditCardCharge.lastDigits,
				cardBrand: raw.creditCardCharge.cardBrand ?? undefined,
			});
		}

		if (raw.paymentMethod === 'BOLETO' && raw.boletoCharge) {
			return new BoletoCharge({
				...baseData,
				barcode: raw.boletoCharge.barcode,
				dueDate: raw.boletoCharge.dueDate,
			});
		}

		throw new Error(`Invalid charge data for payment method: ${raw.paymentMethod}`);
	}

	static toResponseDto(entity: Charge): CreateChargeResponseDTO {
		const baseResponse = {
			id: entity.id,
			customerId: entity.customerId,
			amount: entity.amount,
			currency: entity.currency,
			paymentMethod: entity.paymentMethod,
			status: entity.status,
			createdAt: entity.createdAt,
			updatedAt: entity.updatedAt,
		};

		if (entity instanceof PixCharge) {
			return {
				...baseResponse,
				paymentData: {
					pixKey: entity.pixKey,
					qrCode: entity.qrCode,
				},
			};
		}

		if (entity instanceof CreditCardCharge) {
			return {
				...baseResponse,
				paymentData: {
					installments: entity.installments,
					lastDigits: entity.lastDigits,
					cardBrand: entity.cardBrand,
				},
			};
		}

		if (entity instanceof BoletoCharge) {
			return {
				...baseResponse,
				paymentData: {
					barcode: entity.barcode,
					dueDate: entity.dueDate,
				},
			};
		}

		throw new Error(`Unsupported charge type for response DTO`);
	}
}
