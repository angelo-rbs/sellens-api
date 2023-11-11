import { compare } from 'bcrypt';
import { preHandlerAsyncHookHandler } from 'fastify';
import { findUserByLogin } from '@services/authService';

export const basicAuth: preHandlerAsyncHookHandler = async (req, res) => {
	const authHeader = req.headers['authorization'];
	if (!authHeader) {
		return res.status(401).send({ error: 'No authorization header' });
	}

	const [authType, authKey] = authHeader.split(' ');

	if (authType !== 'Basic') {
		return res
			.status(401)
			.send({ error: 'Required basic auth (username/password)' });
	}

	const [login, senha] = Buffer.from(authKey, 'base64')
		.toString('ascii')
		.split(':');

	const user = await findUserByLogin(login);

	if (!user) {
		return res.status(401).send({ error: 'Invalid credentials' });
	}

	const hasMatch = await compare(senha, user.senha);

	if (!hasMatch) {
		return res.status(401).send({ error: 'Incorrect password' });
	}
};
