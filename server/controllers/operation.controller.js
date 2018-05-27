import Operation from '../models/operation.model';

/**
 * Load Operation and append to req.
 */
function load(req, res, next, id) {
  Operation.get(id)
    .then((operation) => {
      req.operation = operation; // eslint-disable-line no-param-reassign
      return next();
    })
    .catch(e => next(e));
}

/**
 * Get operation
 * @returns {Operation}
 */
function get(req, res) {
  return res.json(req.operation);
}

/**
 * Create new Operation
 * @property {string} req.body.operationId - The operation id of operation.
 * @property {string} req.body.name - The name of operation.
 * @returns {Operation}
 */
function create(req, res, next) {
  const operation = new Operation(req.body);

  operation.save()
    .then(savedOperation => res.json(savedOperation))
    .catch(e => next(e));
}

/**
 * Update existing operation
 * @property {string} req.body.operationId - The operation id of operation.
 * @property {string} req.body.name - The name of operation.
 * @returns {Operation}
 */
function update(req, res, next) {
  const operation = req.operation;
  operation.name = req.body.name;
  operation.revision = req.body.revision;
  operation.type = req.body.type;
  operation.releaseStatus = req.body.releaseStatus;
  operation.estimatedTime = req.body.estimatedTime;
  operation.previousOperationId = req.body.previousOperationId;
  operation.nextOperationId = req.body.nextOperationId;
  operation.quantityProduced = req.body.quantityProduced;
  operation.machine = operation.body.machine;
  operation.tool = operation.body.tool;
  operation.machine = req.body.machine;
  
  operation.save()
    .then(savedOperation => res.json(savedOperation))
    .catch(e => next(e));
}

/**
 * Get operation order list.
 * @property {number} req.query.skip - Number of operation to be skipped.
 * @property {number} req.query.limit - Limit number of operation to be returned.
 * @returns {Operation[]}
 */
function list(req, res, next) {
  const { limit = 50, skip = 0 } = req.query;
  Operation.list({ limit, skip })
    .then(operations => res.json(operations))
    .catch(e => next(e));
}

/**
 * Delete operation.
 * @returns {Operation}
 */
function remove(req, res, next) {
  const operation = req.operation;
  operation.remove()
    .then(deletedOperation => res.json(deletedOperation))
    .catch(e => next(e));
}

export default { load, get, create, update, list, remove };
