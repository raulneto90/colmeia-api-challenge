import type { Charge } from '../entities/charge.entity';
import type { CreateChargeDto } from './dtos/create-charge.dto';

export interface ChargesRepository {
	create(data: CreateChargeDto): Promise<Charge>;
}
