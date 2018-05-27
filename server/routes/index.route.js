import express from 'express';
import userRoutes from './user.route';
import authRoutes from './auth.route';
import postRoutes from './post.route';
import workRoutes from './work.route';
import machineRoutes from './machine.route';
import plantRoutes from './plant.route';
import departmentRoutes from './department.route';
import toolRoutes from './tool.route';
import customerRoutes from './coustomer.route';
import workorderRoutes from './workorder.route';

const router = express.Router(); // eslint-disable-line new-cap

/** GET /health-check - Check service health */
router.get('/health-check', (req, res) =>
  res.send('OK')
);

// mount user routes at /users
router.use('/users', userRoutes);

// mount auth routes at /auth
router.use('/auth', authRoutes);

router.use('/posts', postRoutes);

router.use('/workorders', workorderRoutes);

router.use('/machines', machineRoutes);

router.use('/plants', plantRoutes);

router.use('/departments', departmentRoutes);

router.use('/tools', toolRoutes);

router.use('/customers', customerRoutes);

export default router;
