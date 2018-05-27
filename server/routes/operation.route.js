import express from 'express';
import validate from 'express-validation';
import paramValidation from '../config/param-validation';
import OperationCtrl from '../controllers/operation.controller';


const router = express.Router(); // eslint-disable-line new-cap

router.route('/')
  /** GET /api/users - Get list of users */
  .get(OperationCtrl.list)

  /** POST /api/users - Create new user */
  .post(validate(paramValidation.createOperation), OperationCtrl.create);

router.route('/:operationId')
  /** GET /api/users/:userId - Get user */
  .get(OperationCtrl.get)

  /** PUT /api/users/:userId - Update user */
  .put(validate(paramValidation.updateOperation), OperationCtrl.update)

  /** DELETE /api/users/:userId - Delete user */
  .delete(OperationCtrl.remove);

/** Load user when API with userId route parameter is hit */
router.param('operationId', OperationCtrl.load);

export default router;
