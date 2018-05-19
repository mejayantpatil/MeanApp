import express from 'express';
import validate from 'express-validation';
import paramValidation from '../config/param-validation';
import workCtrl from '../controllers/work.controller';


const router = express.Router(); // eslint-disable-line new-cap

router.route('/')
  /** GET /api/users - Get list of users */
  .get(workCtrl.list)

  /** POST /api/users - Create new user */
  .post(validate(paramValidation.createWork), workCtrl.create);

router.route('/:workId')
  /** GET /api/users/:userId - Get user */
  .get(workCtrl.get)

  /** PUT /api/users/:userId - Update user */
  .put(validate(paramValidation.updateUser), workCtrl.update)

  /** DELETE /api/users/:userId - Delete user */
  .delete(workCtrl.remove);

/** Load user when API with userId route parameter is hit */
router.param('workId', workCtrl.load);

export default router;
