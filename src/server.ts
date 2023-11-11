import fastify, { FastifyInstance } from 'fastify';

import { fastifyAutoload } from '@fastify/autoload';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

import { basicAuth } from '@middleware/auth';
import { disconnectPrisma } from './database/prisma';
import { userSchemas } from '@schemas/userSchema';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const server: FastifyInstance = fastify({
	logger: true,
});

server.addHook('preHandler', basicAuth);

// plugins de rotas
server.register(fastifyAutoload, {
	dir: join(__dirname, 'routes'),
	options: { prefix: '/api/v1' },
});

server.addHook('onClose', disconnectPrisma);

const PORT = Number(process.env.PORT) || 3000;

server.listen({ port: PORT }, (err, address) => {
	if (err) {
		server.log.error(err);
		disconnectPrisma();

		process.exit(1);
	}

	server.log.info(`server listening on ${address}`);
});
