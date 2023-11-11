import { FastifyInstance, FastifyPluginAsync } from 'fastify';
import {
	registerUserHandler,
	getAllUserHandler,
	getUserByIdHandler,
	updateUserHandler,
	deleteUserHandler,
} from 'src/controllers/userController';

const userRoutes: FastifyPluginAsync = async (server: FastifyInstance) => {
	server.post('/user', registerUserHandler);
	server.get('/user', getAllUserHandler);
	server.get('/user/:id', getUserByIdHandler);
	server.put('/user/:id', updateUserHandler);
	server.delete('/user/:id', deleteUserHandler);
};

export default userRoutes;
