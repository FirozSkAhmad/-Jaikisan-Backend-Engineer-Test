const mongoose = require('mongoose');

const customerCardSchema = new mongoose.Schema({
  cardNumber: {
    type: String,
    unique: true,
  },
  cardType: {
    type: String,
    required: true,
    enum: ['REGULAR', 'SPECIAL'],
  },
  customerName: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: 'ACTIVE',
    enum: ['ACTIVE', 'INACTIVE'],
  },
  vision: {
    type: String,
    required: true,
  },
  customerID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Customer',
    required: true,
  },
});

const CustomerCard = mongoose.model('CustomerCard', customerCardSchema);

module.exports = CustomerCard;