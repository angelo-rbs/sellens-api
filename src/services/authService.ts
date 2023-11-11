import { prisma } from 'src/database/prisma';

export const findUserByLogin = async (login: string) => {
	try {
		const user = await prisma.user.findUnique({
			where: {
				login,
			},
		});

		return user;
	} catch (error) {
		throw error;
	}
};
