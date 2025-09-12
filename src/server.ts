import { createServer } from 'http';
import mongoose from 'mongoose';
import app from './app';
import { connectRedis } from './app/config/redis.config';

import { Server } from 'socket.io';
import { envVars } from './app/config/env';

let server: ReturnType<typeof createServer>;

/**
 * io -> manages all connections , can broadcast to everyone
 * socket -> represents a sing client connection
 * emit() -> send data 
 * on()  -> listen data
*/


const userSocketData: { [userId: string]: string } = {};
export function getReceiverSocketId(userId : string) {
     return userSocketData[userId]
   }
    
const startServer = async () => {
  try {
    await mongoose.connect(
      'mongodb+srv://L2A5:PASS_L2A5@cluster0.zsn3kat.mongodb.net/learnmood?'
    );
    console.log('Connected to DB');

    // 1 creates http server
    server = createServer(app);

   
    
    //2 initialize socket.io
    const io = new Server(server, {
      cors: {
        origin: [
          envVars.FRONTEND_URL
        ],
        credentials: true,
      },
    });




    // 3 socket.io events
    io.on('connection', (socket) => {
      console.log("Socket user connected", socket.id);


      const userId = socket.handshake.query.userId;

      if (userId) userSocketData[userId as string] = socket.id;

      io.emit("getOnlineUsers", Object.keys(userSocketData))
      
      socket.on('disconnect', () => {
        console.log("Socket user disconnected", socket.id);
        delete userSocketData[userId as string]
        io.emit("getOnlineUsers" , Object.keys(userSocketData))
      })
    })
 
    // 4 listen to server
    server.listen(envVars.PORT, () => {
      console.log(`Server runnin on port ${envVars.PORT}`);
    })
   
  } catch (error) {
    console.log(error);
  }
};

(() => {
  startServer();
  connectRedis()
})()

/**
 * unhandled rejection error
 * uncaught rejection error
 * signal termination sigterm
 */

process.on('SIGTERM', () => {
  console.log('SIGTERM signal recieved... Server shutting down..');

  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }

  process.exit(1);
});

process.on('SIGINT', () => {
  console.log('SIGINT signal recieved... Server shutting down..');

  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }

  process.exit(1);
});

process.on('unhandledRejection', err => {
  console.log('Unhandled Rejecttion detected... Server shutting down..', err);

  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }

  process.exit(1);
});

process.on('uncaughtException', err => {
  console.log('Uncaught Exception detected... Server shutting down..', err);

  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }

  process.exit(1);
});
