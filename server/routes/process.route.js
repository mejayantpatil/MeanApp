import express from 'express';
import validate from 'express-validation';
import paramValidation from '../config/param-validation';
import processCtrl from '../controllers/process.controller';


const router = express.Router(); // eslint-disable-line new-cap

router.route('/')
  /** GET /api/users - Get list of users */
  .get(processCtrl.list)

  /** POST /api/users - Create new user */
  .post(validate(paramValidation.createProcess), processCtrl.create);

router.route('/:processId')
  /** GET /api/users/:userId - Get user */
  .get(processCtrl.get)

  /** PUT /api/users/:userId - Update user */
  .put(validate(paramValidation.updateProcess), processCtrl.update)

  /** DELETE /api/users/:userId - Delete user */
  .delete(processCtrl.remove);

/** Load user when API with userId route parameter is hit */
router.param('processId', processCtrl.load);

export default router;
