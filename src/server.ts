import { createServer } from 'http';
import mongoose from 'mongoose';
import { connectRedis } from './app/config/redis.config';
import { envVars } from './app/config/env';
import { initSocket } from './socket';
import app from './app';
let server = createServer(app);

const startServer = async () => {
  try {
    await mongoose.connect(
      'mongodb+srv://L2A5:PASS_L2A5@cluster0.zsn3kat.mongodb.net/learnmood?'
    );
    console.log('Connected to DB');

    // Initialize Socket.IO
    initSocket(server);

    // Start HTTP server
    server.listen(envVars.PORT, () => {
      console.log(`Server running on port ${envVars.PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

(() => {
  startServer();
  connectRedis();
})();

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
