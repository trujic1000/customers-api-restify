const errors = require('restify-errors');
const Customer = require('./customerModel');

module.exports = (server) => {
  // GET CUSTOMERS
  server.get('/customers', async (req, res, next) => {
    try {
      const customers = await Customer.find({});
      res.send({ customers });
      next();
    } catch (error) {
      return next(new errors.InvalidContentError(error));
    }
  });
  // GET SINGLE CUSTOMER
  server.get('/customers/:id', async (req, res, next) => {
    const { id } = req.params;
    try {
      const customer = await Customer.findById(id);
      res.send({ customer });
      next();
    } catch (error) {
      return next(new errors.ResourceNotFoundError(`There is not customer with the id of ${id}`));
    }
  });

  // ADD CUSTOMER
  server.post('/customers', async (req, res, next) => {
    // Check for JSON
    if(!req.is('application/json')) {
      return next(new errors.InvalidContentError("Expects 'application/json'"));
    }

    const { name, email, balance } = req.body;
    
    const customer = new Customer({
      name, 
      email, 
      balance
    });

    try {
      const newCustomer = await customer.save();
      res.send(201);
      next();
    } catch (error) {
      return next(new errors.InternalError(error.message));
    }
  });

  // UPDATE CUSTOMER
  server.put('/customers/:id', async (req, res, next) => {
    // Check for JSON
    if(!req.is('application/json')) {
      return next(new errors.InvalidContentError("Expects 'application/json'"));
    }
    
    const { id } = req.params;

    try {
      const customer = await Customer.findOneAndUpdate({ _id: id}, req.body);
      res.send(200);
      next();
    } catch (error) {
      return next(new errors.ResourceNotFoundError(`There is not customer with the id of ${id}`));
    }
  });

  // DELETE CUSTOMER
  server.del('/customers/:id', async (req, res, next) => {
    const { id } = req.params;
    try {
      const customer = await Customer.findOneAndRemove({ _id: id });
      res.send(204);
      next();
    } catch (error) {
      return next(new errors.ResourceNotFoundError(`There is not customer with the id of ${id}`));      
    }
  });
}