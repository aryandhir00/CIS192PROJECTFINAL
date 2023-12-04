import express from 'express';
import Transaction from '../models/transaction';
import User from '../models/user';


const router = express.Router();

router.get('/transactions', async (req, res, next) => {
  try {
      /* eslint-disable @typescript-eslint/no-unnecessary-type-assertion  */
      const userTransactions = await Transaction.find({ author: req.session!.username });
      
      res.status(200).json(userTransactions);
  } catch (error) {
      next(error);
      /* eslint-disable no-useless-return  */
      return;
  }
});





  router.post('/transactions/add', async(req, res, next) => {
    /* eslint-disable prefer-destructuring, @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access  */
    const { name, amount, summary} = req.body;

    /* eslint-disable @typescript-eslint/no-unnecessary-type-assertion  */
    const author = req.session!.username;
    /* eslint-disable @typescript-eslint/restrict-plus-operands  */
    const userTransactions = await Transaction.find({ author: req.session!.username });
    const user = await User.findOne({ username:  req.session!.username});

    if (!user) {
      return;
    }
    try {
        const newTransaction = new Transaction({
            /* eslint-disable object-shorthand  */
            name: name,
            amount: amount,
            summary: summary,
            author: author
        });
        const totalAmount = userTransactions.reduce((sum, transaction) => sum + transaction.amount, 0) + newTransaction.amount;
        if (totalAmount > user.budget) {
          res.status(400).json({ message: 'Budget too small' });
          return;
        }
        const savedTransaction = await newTransaction.save();
        res.status(201).json(savedTransaction);
    } catch (error) {
        next(error); 
        return;
      }
    
});

export default router;
