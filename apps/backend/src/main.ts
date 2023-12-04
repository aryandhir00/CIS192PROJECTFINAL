import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieSession from 'cookie-session';
import accountRouter from './routes/account';
import apiRouter from './routes/api';


const port = process.env.PORT || 3000;
const app = express();



app.use(cors({ 
  origin: ['http://localhost:5173', 'http://127.0.0.1:5173'], 
  credentials: true 
}));

/* eslint-disable-next-line @typescript-eslint/no-unsafe-call */
app.use(cookieSession({
    name: 'session',
    keys: ['user', 'password'],
    secure: false,
  //   credentials: true, NOTE FROM TUNEER: not a cookieSession option
    // Cookie Options
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  }))
  
  app.use(express.json())
  
  const dbURI = 'mongodb+srv://aryand19:4u6ajztf@cluster1.ypvbhgx.mongodb.net/Eslint'; 
  // const dbURI = 'mongodb+srv://aryand19:cricketpennindialondon@cluster0.gwfo02u.mongodb.net/?retryWrites=true&w=majority';
  
  mongoose.connect(dbURI);
  
  
  
  
  
  // const port = process.env.PORT || 3000;
  
  /* eslint-disable @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access */
  // const app = express();
  
  
  
  
  
  app.use(express.json())
  
  // app.use((req, res, next) => {
  //   res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:5173');
  //   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  //   res.setHeader('Access-Control-Allow-Headers', 'Content-type');
  //   next();
  // });
  
  
app.use('/account', accountRouter);
app.use('/api', apiRouter);
  
  app.listen(port, () => {
      console.log("Server is running on port 3000");
    });