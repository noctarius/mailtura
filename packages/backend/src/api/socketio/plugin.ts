import { Server, type ServerOptions } from "socket.io";
import fastifyPlugin from "fastify-plugin";

declare module "fastify" {
  interface FastifyInstance {
    socket: Server;
  }
}

export type SocketIoOptions = Partial<ServerOptions> & {
  preClose?: (done: (...args: any[]) => void) => void;
};

const socketIo = fastifyPlugin<SocketIoOptions>(
  async (fastify, options) => {
    const socket = new Server(fastify.server, options);
    fastify.decorate("socket", socket);
    fastify.addHook("preClose", done => {
      if (options.preClose) {
        return options.preClose(done);
      }
      fastify.socket.local.disconnectSockets(true);
      done();
    });

    fastify.addHook("onClose", (instance, done) => {
      instance.socket.close().then(() => done());
    });
  },
  { name: "socketio" }
);

export default socketIo;
