import {Schema, model} from 'mongoose';


const userSchema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  transactionTotal: { type: Number, required: false },
  budget: {type: Number, required: true, default: 0}
}, {
  collection: 'userInfo'
});

const User = model('userInfo', userSchema);

export default User;