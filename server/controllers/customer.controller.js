import Customer from '../models/customer.model';

/**
 * Load Customer and append to req.
 */
function load(req, res, next, id) {
  Customer.get(id)
    .then((customer) => {
      req.customer = customer; // eslint-disable-line no-param-reassign
      return next();
    })
    .catch(e => next(e));
}

/**
 * Get customer
 * @returns {Customer}
 */
function get(req, res) {
  return res.json(req.customer);
}

/**
 * Create new Customer
 * @property {string} req.body.customerId - The customer id of customer.
 * @property {string} req.body.name - The name of customer.
 * @returns {Customer}
 */
function create(req, res, next) {
  const customer = new Customer(req.body);

  customer.save()
    .then(savedCustomer => res.json(savedCustomer))
    .catch(e => next(e));
}

/**
 * Update existing customer
 * @property {string} req.body.customerId - The customer id of customer.
 * @property {string} req.body.name - The name of customer.
 * @returns {Customer}
 */
function update(req, res, next) {
  const customer = req.customer;
  customer.name = req.body.name;
  customer.address = req.body.address;
  customer.city = req.body.city;
  customer.state = req.body.state;
  customer.country = req.body.country;
  customer.desc = req.body.desc;
  customer.pincode = req.body.pincode;
  customer.save()
    .then(savedCustomer => res.json(savedCustomer))
    .catch(e => next(e));
}

/**
 * Get customer order list.
 * @property {number} req.query.skip - Number of customer to be skipped.
 * @property {number} req.query.limit - Limit number of customer to be returned.
 * @returns {Customer[]}
 */
function list(req, res, next) {
  const { limit = 50, skip = 0 } = req.query;
  Customer.list({ limit, skip })
    .then(customers => res.json(customers))
    .catch(e => next(e));
}

/**
 * Delete customer.
 * @returns {Customer}
 */
function remove(req, res, next) {
  const customer = req.customer;
  customer.remove()
    .then(deletedCustomer => res.json(deletedCustomer))
    .catch(e => next(e));
}

export default { load, get, create, update, list, remove };
