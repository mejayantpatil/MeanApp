import express from 'express';
import validate from 'express-validation';
import paramValidation from '../config/param-validation';
import toolCtrl from '../controllers/tool.controller';


const router = express.Router(); // eslint-disable-line new-cap

router.route('/')
  /** GET /api/users - Get list of users */
  .get(toolCtrl.list)

  /** POST /api/users - Create new user */
  .post(validate(paramValidation.createTool), toolCtrl.create);

router.route('/:toolId')
  /** GET /api/users/:userId - Get user */
  .get(toolCtrl.get)

  /** PUT /api/users/:userId - Update user */
  .put(validate(paramValidation.updateTool), toolCtrl.update)

  /** DELETE /api/users/:userId - Delete user */
  .delete(toolCtrl.remove);

/** Load user when API with userId route parameter is hit */
router.param('toolId', toolCtrl.load);

export default router;
