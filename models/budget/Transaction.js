const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  account: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  transactionType: {
    type: String,
    enum: ['income', 'expense']
  },
  date: {
    type: Date,
    default: Date.now
  },
  description: {
    type: String
  },
  ammount: {
    type: mongoose.Schema.Types.Decimal128,
    default: 0.0
  }
});

module.exports = Transaction = mongoose.model('transaction', transactionSchema);
