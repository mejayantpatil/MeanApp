import express from 'express';
import validate from 'express-validation';
import paramValidation from '../config/param-validation';
import machineCtrl from '../controllers/machine.controller';


const router = express.Router(); // eslint-disable-line new-cap

router.route('/')
  /** GET /api/users - Get list of users */
  .get(machineCtrl.list)

  /** POST /api/users - Create new user */
  .post(validate(paramValidation.createMachine), machineCtrl.create);

router.route('/:machineId')
  /** GET /api/users/:userId - Get user */
  .get(machineCtrl.get)

  /** PUT /api/users/:userId - Update user */
  .put(validate(paramValidation.updateUser), machineCtrl.update)

  /** DELETE /api/users/:userId - Delete user */
  .delete(machineCtrl.remove);

/** Load user when API with userId route parameter is hit */
router.param('machineId', machineCtrl.load);

export default router;
