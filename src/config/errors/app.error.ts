interface ConstructorParams {
	message: string;
	statusCode?: number;
}

export class AppError extends Error {
	readonly statusCode: number;
	readonly message: string;

	constructor({ message, statusCode = 400 }: ConstructorParams) {
		super(message);
		this.statusCode = statusCode;
		this.message = message;
	}
}
