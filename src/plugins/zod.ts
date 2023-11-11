import fp from 'fastify-plugin';
import { FastifyPluginCallback } from 'fastify';

import { z } from 'zod';

declare module 'fastify' {
  interface FastifyInstance {
    z: any;
  }
}

// faz sentido?

const zodPlugin: FastifyPluginCallback = fp((server, options, done) => {
  server.decorate('z', z);

  done();
});

export default zodPlugin;
