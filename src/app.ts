import express, { type Request, type Response } from 'express';

import cookieParser from 'cookie-parser';
import cors from 'cors';
import passport from 'passport';
import expressSession from 'express-session';
import './app/config/passport';
import { mainRoutes } from './app/mainRoutes/mainRoutes';
import { globalErrorHandler } from './app/middlewares/globalErrorHandler';
import notFound from './app/middlewares/notFound';
import { envVars } from './app/config/env';
const app = express();

app.use(
  cors({
    origin: [
      envVars.FRONTEND_URL,
      'https://anower-private-video.s3.ap-south-1.amazonaws.com',
    ],
    credentials: true, //for cookies
  })
);
// for passport configeration
app.use(
  expressSession({
    secret: 'Your Secret',
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.set('trust proxy', 1);

app.use(express.urlencoded({ extended: true }));//form data handler


app.use(cookieParser());
app.use(express.json());

app.use('/api/v1', mainRoutes);

app.get('/', (req: Request, res: Response) => {
  res.status(200).json({
    message: ' welcome to learnmood backend',
  });
});

app.use(globalErrorHandler);
app.use(notFound);
export default app;
