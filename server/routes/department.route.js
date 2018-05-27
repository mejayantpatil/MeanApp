import express from 'express';
import validate from 'express-validation';
import paramValidation from '../config/param-validation';
import departmentCtrl from '../controllers/department.controller';


const router = express.Router(); // eslint-disable-line new-cap

router.route('/')
  /** GET /api/users - Get list of users */
  .get(departmentCtrl.list)

  /** POST /api/users - Create new user */
  .post(validate(paramValidation.createDepartment), departmentCtrl.create);

router.route('/:departmentId')
  /** GET /api/users/:userId - Get user */
  .get(departmentCtrl.get)

  /** PUT /api/users/:userId - Update user */
  .put(validate(paramValidation.updateDepartment), departmentCtrl.update)

  /** DELETE /api/users/:userId - Delete user */
  .delete(departmentCtrl.remove);

/** Load user when API with userId route parameter is hit */
router.param('departmentId', departmentCtrl.load);

export default router;
