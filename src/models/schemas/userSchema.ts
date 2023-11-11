import { Papel } from '@prisma/client';
import { z } from 'zod';
import { genSalt, hash } from 'bcrypt';
import { buildJsonSchemas } from 'fastify-zod';

import { enderecoSchema } from '@schemas/enderecoSchema';

import validarCpf from '@utils/cpfValidation';

const userCore = {
	nome: z.string(),
	login: z.string(),
	papel: z.nativeEnum(Papel),
	email: z
		.string()
		.email({
			message: 'E-mail inválido',
		})
		.nullable(),

	cpf: z
		.string()
		.regex(/(\d{3}\.\d{3}\.\d{3}\-\d{2}|\d{11})/, {
			message: 'CPF em formato inválido (utilize XXX.XXX.XXX-XX)',
		})
		.refine(validarCpf, {
			message: 'CPF inválido',
		})
		.nullable(),

	dataNascimento: z.coerce
		.date()
		.min(new Date(1940, 0, 0), {
			message: 'Data de nascimento inválida',
		})
		.max(new Date(), {
			message: 'A data de nascimento não pode ser posterior à data atual',
		}),

	endereco: enderecoSchema,
};

export const userInputSchema = z.object({
	...userCore,
	senha: z
		.string() // TODO: cabe adicionar constraints
		.transform(async pswd => {
			const salt = await genSalt(10);
			return await hash(pswd, salt);
		}),
});

export const userOutputSchema = z.object({
	...userCore,
	id: z.string(),
	endereco: z.array(enderecoSchema),
	createdAt: z.date(),
	updatedAt: z.date(),
});

export type UserInput = z.input<typeof userInputSchema>;
export const { schemas: userSchemas, $ref } = buildJsonSchemas({
	userInputSchema,
	userOutputSchema,
});
