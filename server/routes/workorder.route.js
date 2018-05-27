import express from 'express';
import validate from 'express-validation';
import paramValidation from '../config/param-validation';
import workorderCtrl from '../controllers/workorder.controller';


const router = express.Router(); // eslint-disable-line new-cap

router.route('/')
  /** GET /api/users - Get list of users */
  .get(workorderCtrl.list)

  /** POST /api/users - Create new user */
  .post(validate(paramValidation.createWorkorder), workorderCtrl.create);

router.route('/:workorderId')
  /** GET /api/users/:userId - Get user */
  .get(workorderCtrl.get)

  /** PUT /api/users/:userId - Update user */
  .put(validate(paramValidation.updateWorkorder), workorderCtrl.update)

  /** DELETE /api/users/:userId - Delete user */
  .delete(workorderCtrl.remove);

/** Load user when API with userId route parameter is hit */
router.param('workorderId', workorderCtrl.load);

export default router;
