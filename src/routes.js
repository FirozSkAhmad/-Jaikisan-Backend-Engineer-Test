const express = require('express');
const router = express.Router();
const CustomerController = require('./controllers/customerController');
const CardController = require('./controllers/customerController');

router.use('/customer', express.Router()
  .get('/', CustomerController.getAllCustomers)
  .delete('/:id', CustomerController.deleteCustomer)
  .post('/', CustomerController.createCustomer));

router.use('/card', express.Router()
  .get('/', CardController.getAllCards)
  .post('/', CardController.createCard));

module.exports = router;