import express from 'express';
import validate from 'express-validation';
import paramValidation from '../config/param-validation';
import plantCtrl from '../controllers/plant.controller';


const router = express.Router(); // eslint-disable-line new-cap

router.route('/')
  /** GET /api/users - Get list of users */
  .get(plantCtrl.list)

  /** POST /api/users - Create new user */
  .post(validate(paramValidation.createPlant), plantCtrl.create);

router.route('/:plantId')
  /** GET /api/users/:userId - Get user */
  .get(plantCtrl.get)

  /** PUT /api/users/:userId - Update user */
  .put(validate(paramValidation.updatePlant), plantCtrl.update)

  /** DELETE /api/users/:userId - Delete user */
  .delete(plantCtrl.remove);

/** Load user when API with userId route parameter is hit */
router.param('plantId', plantCtrl.load);

export default router;
