import z from 'zod/v4';

export const createCustomerSchema = z.object({
	name: z.string().min(1, 'Name is required'),
	email: z.email('Invalid email address'),
	phone: z.string().min(1, 'Phone is required'),
	document: z.string().min(1, 'Document is required'),
});

export type CreateCustomerDTO = z.infer<typeof createCustomerSchema>;
