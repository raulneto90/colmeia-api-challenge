import z from 'zod';
import 'dotenv/config';

const envSchema = z.object({
	APP_PORT: z.coerce.number().min(1).default(3333),
	DATABASE_URL: z.string(),
});

const _env = envSchema.safeParse(process.env);

if (!_env.success) {
	console.error('Invalid environment variables:', _env.error);
	process.exit(1);
}

export const env = _env.data;
