import { ApiProperty } from '@nestjs/swagger';

export class CreateCustomerResponseDTO {
	@ApiProperty({
		description: 'Unique identifier for the customer',
		example: '123e4567-e89b-12d3-a456-426614174000',
	})
	id: string;

	@ApiProperty({
		description: 'Name of the customer',
		example: 'John Doe',
	})
	name: string;

	@ApiProperty({
		description: 'Email address of the customer',
		example: 'john.doe@example.com',
	})
	email: string;

	@ApiProperty({
		description: 'Phone number of the customer',
		example: '+1234567890',
	})
	phone: string;

	@ApiProperty({
		description: 'Document number of the customer',
		example: '12345678901',
	})
	document: string;

	@ApiProperty({
		description: 'Creation date of the customer record',
		example: '2023-01-01T00:00:00Z',
	})
	createdAt: Date;

	@ApiProperty({
		description: 'Last update date of the customer record',
		example: '2023-01-01T00:00:00Z',
	})
	updatedAt: Date;
}
