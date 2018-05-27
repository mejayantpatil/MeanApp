import express from 'express';
import validate from 'express-validation';
import paramValidation from '../config/param-validation';
import subworkorderCtrl from '../controllers/subworkorder.controller';


const router = express.Router(); // eslint-disable-line new-cap

router.route('/')
  /** GET /api/users - Get list of users */
  .get(subworkorderCtrl.list)

  /** POST /api/users - Create new user */
  .post(validate(paramValidation.createPart), subworkorderCtrl.create);

router.route('/:subworkorderId')
  /** GET /api/users/:userId - Get user */
  .get(subworkorderCtrl.get)

  /** PUT /api/users/:userId - Update user */
  .put(validate(paramValidation.updatePart), subworkorderCtrl.update)

  /** DELETE /api/users/:userId - Delete user */
  .delete(subworkorderCtrl.remove);

/** Load user when API with userId route parameter is hit */
router.param('subworkorderId', subworkorderCtrl.load);

export default router;
