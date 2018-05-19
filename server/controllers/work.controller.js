import Work from '../models/work.model';

/**
 * Load Work order and append to req.
 */
function load(req, res, next, id) {
  Work.get(id)
    .then((work) => {
      req.work = work; // eslint-disable-line no-param-reassign
      return next();
    })
    .catch(e => next(e));
}

/**
 * Get work
 * @returns {Work}
 */
function get(req, res) {
  return res.json(req.work);
}

/**
 * Create new Work
 * @property {string} req.body.workId - The work id of work order.
 * @property {string} req.body.ScheduledTime - The scheduled time of work order.
 * @returns {Work}
 */
function create(req, res, next) {
  const work = new Work({
    workId: req.body.workId,
    scheduledTime: req.body.scheduledTime,
    processId: req.body.processId,
    operationId: req.body.operationId,
    operationDesc: req.body.operationDesc,
    status: req.body.status
  });

  work.save()
    .then(savedWork => res.json(savedWork))
    .catch(e => next(e));
}

/**
 * Update existing work
 * @property {string} req.body.workId - The work id of work order.
 * @property {string} req.body.scheduledTime - The scheduled time of work order.
 * @returns {Work}
 */
function update(req, res, next) {
  const work = req.work;
  work.workId = req.body.workId;
  work.scheduledTime = req.body.scheduledTime;
  work.processId =req.body.processId;
  work.operationId = req.body.operationId;
  work.operationDesc = req.body.operationDesc;
  work.status = req.body.status;
  work.save()
    .then(savedWork => res.json(savedWork))
    .catch(e => next(e));
}

/**
 * Get work order list.
 * @property {number} req.query.skip - Number of work orders to be skipped.
 * @property {number} req.query.limit - Limit number of work orders to be returned.
 * @returns {Work[]}
 */
function list(req, res, next) {
  const { limit = 50, skip = 0 } = req.query;
  Work.list({ limit, skip })
    .then(workOrders => res.json(workOrders))
    .catch(e => next(e));
}

/**
 * Delete work.
 * @returns {Work}
 */
function remove(req, res, next) {
  const work = req.work;
  work.remove()
    .then(deletedWork => res.json(deletedWork))
    .catch(e => next(e));
}

export default { load, get, create, update, list, remove };
