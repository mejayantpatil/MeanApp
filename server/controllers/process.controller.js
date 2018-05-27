import Process from '../models/process.model';

/**
 * Load Process and append to req.
 */
function load(req, res, next, id) {
  Process.get(id)
    .then((process) => {
      req.process = process; // eslint-disable-line no-param-reassign
      return next();
    })
    .catch(e => next(e));
}

/**
 * Get process
 * @returns {Process}
 */
function get(req, res) {
  return res.json(req.process);
}

/**
 * Create new Process
 * @property {string} req.body.processId - The process id of process.
 * @property {string} req.body.name - The name of process.
 * @returns {Process}
 */
function create(req, res, next) {
  const process = new Process(req.body);

  process.save()
    .then(savedProcess => res.json(savedProcess))
    .catch(e => next(e));
}

/**
 * Update existing process
 * @property {string} req.body.processId - The process id of process.
 * @property {string} req.body.name - The name of process.
 * @returns {Process}
 */
function update(req, res, next) {
  const process = req.process;
  process.name = req.body.name;
  process.revision = req.body.revision;
  process.rolledUpTime = req.body.rolledUpTime;
  process.save()
    .then(savedProcess => res.json(savedProcess))
    .catch(e => next(e));
}

/**
 * Get process order list.
 * @property {number} req.query.skip - Number of process to be skipped.
 * @property {number} req.query.limit - Limit number of process to be returned.
 * @returns {Process[]}
 */
function list(req, res, next) {
  const { limit = 50, skip = 0 } = req.query;
  Process.list({ limit, skip })
    .then(processs => res.json(processs))
    .catch(e => next(e));
}

/**
 * Delete process.
 * @returns {Process}
 */
function remove(req, res, next) {
  const process = req.process;
  process.remove()
    .then(deletedProcess => res.json(deletedProcess))
    .catch(e => next(e));
}

export default { load, get, create, update, list, remove };
