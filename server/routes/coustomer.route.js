import express from 'express';
import validate from 'express-validation';
import paramValidation from '../config/param-validation';
import customerCtrl from '../controllers/customer.controller';


const router = express.Router(); // eslint-disable-line new-cap

router.route('/')
  /** GET /api/users - Get list of users */
  .get(customerCtrl.list)

  /** POST /api/users - Create new user */
  .post(validate(paramValidation.createCustomer), customerCtrl.create);

router.route('/:customerId')
  /** GET /api/users/:userId - Get user */
  .get(customerCtrl.get)

  /** PUT /api/users/:userId - Update user */
  .put(validate(paramValidation.updateCustomer), customerCtrl.update)

  /** DELETE /api/users/:userId - Delete user */
  .delete(customerCtrl.remove);

/** Load user when API with userId route parameter is hit */
router.param('customerId', customerCtrl.load);

export default router;
