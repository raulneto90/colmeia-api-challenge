import { Injectable } from '@nestjs/common';
import { PrismaService } from '@src/modules/common/services/prisma.service';
import {
	ChargeStatus as PrismaChargeStatus,
	PaymentMethod as PrismaPaymentMethod,
} from 'generated/prisma';
import type { Charge } from '../../domain/entities/charge.entity';
import { ChargeStatus } from '../../domain/enums/charge-status.enum';
import { PaymentMethod } from '../../domain/enums/payment-method.enum';
import type { ChargesRepository } from '../../domain/repositories/charges.repository';
import type { CreateChargeDto } from '../../domain/repositories/dtos/create-charge.dto';
import { ChargeMapper } from '../../mappers/charge.mapper';

@Injectable()
export class PostgresChargeRepository implements ChargesRepository {
	constructor(private readonly prismaService: PrismaService) {}

	async create(data: CreateChargeDto): Promise<Charge> {
		const baseData = {
			id: data.id ?? crypto.randomUUID(),
			customerId: data.customerId,
			amount: data.amount,
			currency: data.currency ?? 'BRL',
			paymentMethod: data.paymentMethod as PrismaPaymentMethod,
			status: (data.status ?? ChargeStatus.PENDING) as PrismaChargeStatus,
		};

		// biome-ignore lint: savedCharge type is determined dynamically based on payment method
		let savedCharge;

		switch (data.paymentMethod) {
			case PaymentMethod.PIX: {
				const pixData = data.paymentData as { pixKey: string; qrCode: string };
				savedCharge = await this.prismaService.charge.create({
					data: {
						...baseData,
						pixCharge: {
							create: {
								pixKey: pixData.pixKey,
								qrCode: pixData.qrCode,
							},
						},
					},
					include: {
						pixCharge: true,
					},
				});
				break;
			}

			case PaymentMethod.CREDIT_CARD: {
				const creditCardData = data.paymentData as {
					installments: number;
					lastDigits: string;
					cardBrand?: string;
				};
				savedCharge = await this.prismaService.charge.create({
					data: {
						...baseData,
						creditCardCharge: {
							create: {
								installments: creditCardData.installments,
								lastDigits: creditCardData.lastDigits,
								cardBrand: creditCardData.cardBrand,
							},
						},
					},
					include: {
						creditCardCharge: true,
					},
				});
				break;
			}

			case PaymentMethod.BOLETO: {
				const boletoData = data.paymentData as {
					barcode: string;
					dueDate: Date;
				};
				savedCharge = await this.prismaService.charge.create({
					data: {
						...baseData,
						boletoCharge: {
							create: {
								barcode: boletoData.barcode,
								dueDate: boletoData.dueDate,
							},
						},
					},
					include: {
						boletoCharge: true,
					},
				});
				break;
			}

			default:
				throw new Error(`Unsupported payment method: ${data.paymentMethod}`);
		}

		return ChargeMapper.toDomain(savedCharge);
	}
}
