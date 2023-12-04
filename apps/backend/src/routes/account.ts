import express from 'express';
import cookieSession from 'cookie-session';
import User from '../models/user';

// declare module 'express-session' {
//   export interface SessionData {
//     username: { [key: string]: any } | null;
//     password: { [key: string]: any } | null;
//   }
// }


const routertwo = express.Router();



routertwo.post('/signup', async (req, res, next) => {
  /* eslint-disable prefer-destructuring, @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access  */
  const username = req.body.username;
  const password = req.body.password;
  const existingUser = await User.findOne({ username });
  if (existingUser) {
      /* eslint-disable @typescript-eslint/no-unsafe-return */
      const error = new Error('Username already exists');
      console.log(error); 
      return;
  }
  const newUser = new User({
      /* eslint-disable object-shorthand  */
      username:username,
      password:password,
      budget: 0
  });
  try {
      await newUser.save();
      /* eslint-disable @typescript-eslint/no-unnecessary-type-assertion  */
      req.session!.username = username;
      console.log("SET USERNAME")
      console.log(username)
      res.sendStatus(201);
      console.log(username)

    } catch (error) {
      console.log("error");
      next(error);
      /* eslint-disable no-useless-return  */
      return;
    }
  }
)

routertwo.post('/login', async(req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  const user = await User.findOne({ username, password });
  if (!user) {
    const error = new Error('Invalid username or password');
    next(error); 
    return;
  }
  if (req.session!.username) {
    const error = new Error('Already logged in');
    next(error); 
    return;

  }
  /* eslint-disable no-else-return  */
  else {
    req.session!.username = username;
    console.log(username);
  //  res.cookie('username', username);
  //  res.cookie('password', password);
   res.send('login successful');
   /* eslint-disable prefer-template, @typescript-eslint/restrict-plus-operands  */
   console.log("username" + req.session!.username);
  }
   
 });


/* eslint-disable @typescript-eslint/require-await */
routertwo.post('/logout' , (req, res, next) => {
  console.log(`Logout: ${req.session?.username}`)
  if (req.session!.username) {
    console.log("Logging out user:", req.session!.username);
    req.session!.username = null;
    res.status(200).json({ message: 'Logged out successfully' });
} else {
    console.log(req.session!.username);
    res.status(400).json({ message: 'No user to log out' });
}
});


routertwo.get('/budget', async (req, res, next) => {
  /* eslint-disable prefer-destructuring, @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access  */
    const user = await User.findOne({ username:  req.session!.username});
    if (!user) {
      return res.sendStatus(500);
    }
    res.send({budget: user.budget});
  
  
});

routertwo.put('/budget', async (req, res, next) => {
  /* eslint-disable prefer-destructuring, @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access  */
  const { budget} = req.body;
    const user = await User.findOne({ username:  req.session!.username});
    if (!user) {
      return res.sendStatus(500);
    }
    user.budget = budget;
    await user.save();
    res.send({budget})
    
  

  // try {
  //   req.session!.budget = budget;
  // } catch (error) {
  //   console.log("error");
  //   next(error);
  //   /* eslint-disable no-useless-return  */
  //   return;
  // }
  
});

routertwo.get('/loggedin', (req, res, next) => {
  const author = req.session!.username;
  if (author) {
    res.status(200).json({ isLoggedIn: true });
  }
  else {
    res.status(200).json({ isLoggedIn: false });
  }
});

export default routertwo;
