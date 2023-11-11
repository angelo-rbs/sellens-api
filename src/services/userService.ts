import { UserInput } from '@schemas/userSchema';
import { prisma } from 'src/database/prisma';

const userService = {
	create: async (user: UserInput) => {
		const endereco = user.endereco;

		return await prisma.user.create({
			data: {
				...user,
				endereco: {
					create: {
						...endereco,
					},
				},
			},
		});
	},

	getAll: async () => {
		return await prisma.user.findMany({
			include: {
				endereco: {},
			},
		});
	},

	getOne: async (id: string) => {
		return await prisma.user.findUnique({
			where: {
				id,
			},
			include: {
				endereco: {},
			},
		});
	},

	update: async (user: UserInput, id: string) => {
		const oldUser = await prisma.user.findUnique({
			where: { id },
		});

		if (!oldUser) return null;

		return await prisma.user.update({
			data: {
				...user,
				endereco: {
					upsert: {
						update: {
							...user.endereco,
						},
						where: {
							id: oldUser.enderecoId,
						},
						create: {
							...user.endereco,
						},
					},
				},
			},
			where: {
				id: oldUser.id,
			},
		});
	},

	delete: async (id: string) => {
		return await prisma.user.delete({
			where: {
				id,
			},
		});
	},
};

export default userService;
