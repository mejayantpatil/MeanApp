import Part from '../models/part.model';

/**
 * Load Part and append to req.
 */
function load(req, res, next, id) {
  Part.get(id)
    .then((part) => {
      req.part = part; // eslint-disable-line no-param-reassign
      return next();
    })
    .catch(e => next(e));
}

/**
 * Get part
 * @returns {Part}
 */
function get(req, res) {
  return res.json(req.part);
}

/**
 * Create new Part
 * @property {string} req.body.partId - The part id of part.
 * @property {string} req.body.name - The name of part.
 * @returns {Part}
 */
function create(req, res, next) {
  const part = new Part(req.body);

  part.save()
    .then(savedPart => res.json(savedPart))
    .catch(e => next(e));
}

/**
 * Update existing part
 * @property {string} req.body.partId - The part id of part.
 * @property {string} req.body.name - The name of part.
 * @returns {Part}
 */
function update(req, res, next) {
  const part = req.part;
  part.name = req.body.name;
  part.customerPartId = req.body.customerPartId;
  part.revision = req.body.revision;
  part.partType = req.body.partType;
  part.processId = req.body.processId;
  part.subworkorder  = req.body.subworkorder;
  
  part.save()
    .then(savedPart => res.json(savedPart))
    .catch(e => next(e));
}

/**
 * Get part order list.
 * @property {number} req.query.skip - Number of part to be skipped.
 * @property {number} req.query.limit - Limit number of part to be returned.
 * @returns {Part[]}
 */
function list(req, res, next) {
  const { limit = 50, skip = 0 } = req.query;
  Part.list({ limit, skip })
    .then(parts => res.json(parts))
    .catch(e => next(e));
}

/**
 * Delete part.
 * @returns {Part}
 */
function remove(req, res, next) {
  const part = req.part;
  part.remove()
    .then(deletedPart => res.json(deletedPart))
    .catch(e => next(e));
}

export default { load, get, create, update, list, remove };
