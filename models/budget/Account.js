const mongoose = require('mongoose');

const accountSchema = new mongoose.Schema({
  nickname: {
    type: String,
    required: true
  },
  type: {
    type: String,
    default: 'Cash'
  },
  balance: {
    type: mongoose.Schema.Types.Decimal128,
    default: 0.0
  }
});

module.exports = Account = mongoose.model('account', accountSchema);
