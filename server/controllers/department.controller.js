import Department from '../models/department.model';

/**
 * Load Department order and append to req.
 */
function load(req, res, next, id) {
  Department.get(id)
    .then((department) => {
      req.department = department; // eslint-disable-line no-param-reassign
      return next();
    })
    .catch(e => next(e));
}

/**
 * Get Department
 * @returns {Department}
 */
function get(req, res) {
  return res.json(req.department);
}

/**
 * Create new Department
 * @property {string} req.body.workId - The Department id of Department order.
 * @property {string} req.body.ScheduledTime - The scheduled time of Department order.
 * @returns {Department}
 */
function create(req, res, next) {
  const obj = req.body;
  const department = new Department(obj);

  department.save()
    .then(savedDepartment => res.json(savedDepartment))
    .catch(e => next(e));
}

/**
 * Update existing Department
 * @property {string} req.body.workId - The Department id of Department order.
 * @property {string} req.body.scheduledTime - The scheduled time of Department order.
 * @returns {Department}
 */
function update(req, res, next) {
  const department = req.department;
  department.name = req.body.name;
  department.shop = req.body.shop;
  department.plant = req.body.plant;

  department.save()
    .then(savedDepartment => res.json(savedDepartment))
    .catch(e => next(e));
}

/**
 * Get Department order list.
 * @property {number} req.query.skip - Number of Department orders to be skipped.
 * @property {number} req.query.limit - Limit number of Department orders to be returned.
 * @returns {Department[]}
 */
function list(req, res, next) {
  const { limit = 50, skip = 0 } = req.query;
  Department.list({ limit, skip })
    .then(departments => res.json(departments))
    .catch(e => next(e));
}

/**
 * Delete Department.
 * @returns {Department}
 */
function remove(req, res, next) {
  const department = req.department;
  department.remove()
    .then(deletedDepartment => res.json(deletedDepartment))
    .catch(e => next(e));
}

export default { load, get, create, update, list, remove };
