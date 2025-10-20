import { ApiProperty } from '@nestjs/swagger';

export class CreateCustomerRequestDTO {
	@ApiProperty({ example: 'John Doe', description: "Customer's full name" })
	name: string;

	@ApiProperty({ example: 'john.doe@example.com', description: "Customer's email address" })
	email: string;

	@ApiProperty({ example: '+1234567890', description: "Customer's phone number" })
	phone: string;

	@ApiProperty({ example: '123.456.789-00', description: "Customer's document identifier" })
	document: string;

	@ApiProperty({
		example: '2024-01-01T00:00:00Z',
		description: 'Creation timestamp',
		required: false,
	})
	createdAt?: Date;

	@ApiProperty({
		example: '2024-01-01T00:00:00Z',
		description: 'Last update timestamp',
		required: false,
	})
	updatedAt?: Date;
}
