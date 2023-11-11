import { UserInput, userInputSchema } from '@schemas/userSchema';
import userService from '@services/userService';
import { BAD_REQUEST, NOT_FOUND } from '@utils/errors';
import { FastifyReply, FastifyRequest, RouteHandlerMethod } from 'fastify';
import { z } from 'zod';

export const registerUserHandler: RouteHandlerMethod = async (req, reply) => {
	const body = req.body;
	// console.log(JSON.parse(body));
	console.log(body);

	const user = await userInputSchema.parseAsync(body);

	if (!user) return reply.status(400).send(BAD_REQUEST);

	try {
		const userCriado = await userService.create(user);
		if (userCriado) return reply.status(201).send(userCriado);
	} catch (error) {
		const errorJson = JSON.stringify(error);

		if (error instanceof z.ZodError) {
			return reply.status(400).send(errorJson);
		}

		return reply.status(500).send(errorJson);
	}
};

export const getAllUserHandler: RouteHandlerMethod = async (req, reply) => {
	try {
		const users = await userService.getAll();
		if (!users) return reply.status(400).send(BAD_REQUEST);

		return reply.status(200).send(users);
	} catch (error) {
		const errorJson = JSON.stringify(error);

		if (error instanceof z.ZodError) {
			return reply.status(400).send(errorJson);
		}

		return reply.status(500).send(errorJson);
	}
};

export const getUserByIdHandler = async (
	req: FastifyRequest<{
		Params: {
			id: string;
		};
	}>,
	reply: FastifyReply
) => {
	const { id } = req.params;

	try {
		const user = await userService.getOne(id);
		if (!user) return reply.status(404).send(NOT_FOUND);

		return reply.status(200).send(user);
	} catch (error) {
		const errorJson = JSON.stringify(error);

		if (error instanceof z.ZodError) {
			return reply.status(400).send(errorJson);
		}

		return reply.status(500).send(errorJson);
	}
};

export const updateUserHandler = async (
	req: FastifyRequest<{
		Body: UserInput;
		Params: {
			id: string;
		};
	}>,
	reply: FastifyReply
) => {
	const user = req.body;
	const { id } = req.params;

	try {
		const updatedUser = await userService.update(user, id);
		if (!updatedUser) return reply.status(400).send(NOT_FOUND);

		return reply.status(200).send(updatedUser);
	} catch (error) {
		const errorJson = JSON.stringify(error);

		if (error instanceof z.ZodError) {
			return reply.status(400).send(errorJson);
		}

		return reply.status(500).send(errorJson);
	}
};

export const deleteUserHandler = async (
	req: FastifyRequest<{
		Params: {
			id: string;
		};
	}>,
	reply: FastifyReply
) => {
	const { id } = req.params;

	try {
		console.log('entrou no try');
		const deletedUser = await userService.delete(id);
		console.log('passou do await');
		if (!deletedUser) return reply.status(400).send(BAD_REQUEST);
		console.log('passou do null test');

		return reply.status(204).send();
	} catch (error) {
		const errorJson = JSON.stringify(error);

		if (error instanceof z.ZodError) {
			return reply.status(400).send(errorJson);
		}

		return reply.status(500).send(errorJson);
	}
};
