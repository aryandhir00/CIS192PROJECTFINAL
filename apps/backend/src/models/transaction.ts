import {Schema, model} from 'mongoose';


/* eslint-disable @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access */
const transactionSchema = new Schema({
  
  name: { type: String, required: true },
  amount: { type: Number, required: true },
  summary: { type: String, required: true },
  author: { type: String, required: true },

}, {
  collection: 'transactionInfo'
});

const Transaction = model('transactionInfo', transactionSchema);

// app.listen(3000, ()=>{
//     console.log("on port 3000");
// },

// app.use('/account', require('./account'))
  

export default Transaction;
