import { z } from 'zod';

export const enderecoSchema = z.object({
	numero: z.number().int().nullish(),
	logradouro: z.string(),
	bairro: z.string().nullish(),
	cidade: z.string(),
	estado: z.string().nullish(),
	cep: z
		.string()
		.regex(/\d{5}-\d{3}/)
		.nullish(),
});
