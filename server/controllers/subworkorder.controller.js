import Subworkorder from '../models/subworkorder.model';

/**
 * Load Subworkorder and append to req.
 */
function load(req, res, next, id) {
  Subworkorder.get(id)
    .then((subworkorder) => {
      req.subworkorder = subworkorder; // eslint-disable-line no-param-reassign
      return next();
    })
    .catch(e => next(e));
}

/**
 * Get subworkorder
 * @returns {Subworkorder}
 */
function get(req, res) {
  return res.json(req.subworkorder);
}

/**
 * Create new Subworkorder
 * @property {string} req.body.subworkorderId - The subworkorder id of subworkorder.
 * @property {string} req.body.name - The name of subworkorder.
 * @returns {Subworkorder}
 */
function create(req, res, next) {
  const subworkorder = new Subworkorder(req.body);

  subworkorder.save()
    .then(savedSubworkorder => res.json(savedSubworkorder))
    .catch(e => next(e));
}

/**
 * Update existing subworkorder
 * @property {string} req.body.subworkorderId - The subworkorder id of subworkorder.
 * @property {string} req.body.name - The name of subworkorder.
 * @returns {Subworkorder}
 */
function update(req, res, next) {
  const subworkorder = req.subworkorder;
  subworkorder.subworkorderName = req.body.subworkorderName;
  subworkorder.subworkorderDesc = req.body.subworkorderDesc;
  subworkorder.scheduledStart = req.body.scheduledStart;
  subworkorder.scheduledEnd = req.body.scheduledEnd;
  subworkorder.actualStart = req.body.actualStart;
  subworkorder.actualEnd = req.body.actualEnd;
  subworkorder.estimatedEfforts = req.body.estimatedEfforts;
  subworkorder.actualEfforts = req.body.actualEfforts;
  subworkorder.reasonsForDelay = req.body.reasonsForDelay;
  subworkorder.scrapCost = req.body.scrapCost;
  subworkorder.part = req.body.part;
  
  subworkorder.save()
    .then(savedSubworkorder => res.json(savedSubworkorder))
    .catch(e => next(e));
}

/**
 * Get subworkorder order list.
 * @property {number} req.query.skip - Number of subworkorder to be skipped.
 * @property {number} req.query.limit - Limit number of subworkorder to be returned.
 * @returns {Subworkorder[]}
 */
function list(req, res, next) {
  const { limit = 50, skip = 0 } = req.query;
  Subworkorder.list({ limit, skip })
    .then(subworkorders => res.json(subworkorders))
    .catch(e => next(e));
}

/**
 * Delete subworkorder.
 * @returns {Subworkorder}
 */
function remove(req, res, next) {
  const subworkorder = req.subworkorder;
  subworkorder.remove()
    .then(deletedSubworkorder => res.json(deletedSubworkorder))
    .catch(e => next(e));
}

export default { load, get, create, update, list, remove };
