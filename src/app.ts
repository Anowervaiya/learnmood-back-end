import express, { type Request, type Response } from 'express';

import cookieParser from 'cookie-parser';
import cors from 'cors';
import passport from 'passport';
import expressSession from 'express-session';
import './app/config/passport';
import { mainRoutes } from './app/mainRoutes/mainRoutes';
const app = express();

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

app.use(cors());
app.use(cookieParser());
app.use(express.json());

app.use('/api/v1', mainRoutes);

app.get('/', (req: Request, res: Response) => {
  res.status(200).json({
    message: ' welcome to learnmood backend',
  });
});

// app.use(globalErrorHandler);
// app.use(notFound);
export default app;
