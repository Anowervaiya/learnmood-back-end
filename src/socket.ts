// socket.ts
import { Server as HTTPServer } from 'http';
import { Server, Socket } from 'socket.io';
import { envVars } from './app/config/env';

const userSocketData: { [userId: string]: string } = {};
export let io: Server;

/**
 * Initialize socket.io server
 */
export const initSocket = (server: HTTPServer) => {

  io = new Server(server, {
    cors: {
      origin: [envVars.FRONTEND_URL],
      credentials: true,
    },
  });

  io.on('connection', (socket: Socket) => {
    console.log('Socket user connected', socket.id);

    const userId = socket.handshake.query.userId as string;
    if (userId) userSocketData[userId] = socket.id;

    io.emit('getOnlineUsers', Object.keys(userSocketData));

    socket.on('disconnect', () => {
      console.log('Socket user disconnected', socket.id);
      if (userId) delete userSocketData[userId];
      io.emit('getOnlineUsers', Object.keys(userSocketData));
    });
  });

  
};

export const getSocketId = (userId: string) => {
  return userSocketData[userId];
};
