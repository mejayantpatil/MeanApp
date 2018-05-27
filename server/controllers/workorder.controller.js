import Workorder from '../models/workorder.model';

/**
 * Load Workorder and append to req.
 */
function load(req, res, next, id) {
  Workorder.get(id)
    .then((workorder) => {
      req.workorder = workorder; // eslint-disable-line no-param-reassign
      return next();
    })
    .catch(e => next(e));
}

/**
 * Get workorder
 * @returns {Workorder}
 */
function get(req, res) {
  return res.json(req.workorder);
}

/**
 * Create new Workorder
 * @property {string} req.body.workorderId - The workorder id of workorder.
 * @property {string} req.body.name - The name of workorder.
 * @returns {Workorder}
 */
function create(req, res, next) {
  const workorder = new Workorder(req.body);

  workorder.save()
    .then(savedWorkorder => res.json(savedWorkorder))
    .catch(e => next(e));
}

/**
 * Update existing workorder
 * @property {string} req.body.workorderId - The workorder id of workorder.
 * @property {string} req.body.name - The name of workorder.
 * @returns {Workorder}
 */
function update(req, res, next) {
  const workorder = req.workorder;
  workorder.workorderName = req.body.workorderName;
  workorder.workorderDesc = req.body.workorderDesc;
  workorder.clientName = req.body.clientName;
  workorder.priority = req.body.priority;
  workorder.save()
    .then(savedWorkorder => res.json(savedWorkorder))
    .catch(e => next(e));
}

/**
 * Get workorder order list.
 * @property {number} req.query.skip - Number of workorder to be skipped.
 * @property {number} req.query.limit - Limit number of workorder to be returned.
 * @returns {Workorder[]}
 */
function list(req, res, next) {
  const { limit = 50, skip = 0 } = req.query;
  Workorder.list({ limit, skip })
    .then(workorders => res.json(workorders))
    .catch(e => next(e));
}

/**
 * Delete workorder.
 * @returns {Workorder}
 */
function remove(req, res, next) {
  const workorder = req.workorder;
  workorder.remove()
    .then(deletedWorkorder => res.json(deletedWorkorder))
    .catch(e => next(e));
}

export default { load, get, create, update, list, remove };
