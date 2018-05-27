import express from 'express';
import validate from 'express-validation';
import paramValidation from '../config/param-validation';
import partCtrl from '../controllers/part.controller';


const router = express.Router(); // eslint-disable-line new-cap

router.route('/')
  /** GET /api/users - Get list of users */
  .get(partCtrl.list)

  /** POST /api/users - Create new user */
  .post(validate(paramValidation.createPart), partCtrl.create);

router.route('/:partId')
  /** GET /api/users/:userId - Get user */
  .get(partCtrl.get)

  /** PUT /api/users/:userId - Update user */
  .put(validate(paramValidation.updatePart), partCtrl.update)

  /** DELETE /api/users/:userId - Delete user */
  .delete(partCtrl.remove);

/** Load user when API with userId route parameter is hit */
router.param('partId', partCtrl.load);

export default router;
