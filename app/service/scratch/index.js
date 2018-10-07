import mongoose from 'mongoose';

const User = mongoose.model('User');


export const operationRecord = data => {
  User.insertMany(data, (err, docs) => {
    if (err) {
      console.error(err);
    }
    return docs;
  })
}