import fastifyAuth from '@fastify/auth';
import fp from 'fastify-plugin';
import {
	FastifyPluginAsync,
	FastifyPluginCallback,
	preHandlerAsyncHookHandler,
} from 'fastify';
import { HookAsyncLookup, LifecycleHook } from 'fastify/types/hooks';

// const auth: FastifyPluginCallback = fp(async function (fastify, options, done) {

//     fastify.decorate('verifyJWT', function (request, reply, done) {

//         // validation logic goes here!
//         done() // pass an error if the authentication fails
//     })
//     .decorate('verifyUsernameAndPassword', function (request, reply, done) {
//         // validation logic goes here!
//         done() // pass an error if the authentication fails
//     })
//     .register(fastifyAuth))
//     .after(() => {
//         fastify.route({
//         method: 'GET',
//         url: '/multiple/auth',
//         preHandler: fastify.auth([
//             fastify.verifyJWT,
//             fastify.verifyUsernameAndPassword
//         ]),
//         handler: (req, reply) => {
//             req.log.info('Auth route')
//             reply.send({ hello: 'world' })
//         }
//         })

//     });
// })
