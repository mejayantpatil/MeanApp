import Plant from '../models/plant.model';

/**
 * Load Plant order and append to req.
 */
function load(req, res, next, id) {
  Plant.get(id)
    .then((plant) => {
      req.plant = plant; // eslint-disable-line no-param-reassign
      return next();
    })
    .catch(e => next(e));
}

/**
 * Get Plant
 * @returns {Plant}
 */
function get(req, res) {
  return res.json(req.plant);
}

/**
 * Create new Plant
 * @property {string} req.body.workId - The Plant id of Plant order.
 * @property {string} req.body.ScheduledTime - The scheduled time of Plant order.
 * @returns {Plant}
 */
function create(req, res, next) {
  const obj = req.body;
  const plant = new Plant(obj);

  plant.save()
    .then(savedWork => res.json(savedWork))
    .catch(e => next(e));
}

/**
 * Update existing Plant
 * @property {string} req.body.workId - The Plant id of Plant order.
 * @property {string} req.body.scheduledTime - The scheduled time of Plant order.
 * @returns {Plant}
 */
function update(req, res, next) {
  const plant = req.plant;
  plant.name = req.body.name;
  plant.address = req.body.address;
  plant.city = req.body.city;
  plant.state = req.body.state;
  plant.country = req.body.country;
  plant.pincode = req.body.pincode;

  plant.save()
    .then(savedPlant => res.json(savedPlant))
    .catch(e => next(e));
}

/**
 * Get Plant order list.
 * @property {number} req.query.skip - Number of Plant orders to be skipped.
 * @property {number} req.query.limit - Limit number of Plant orders to be returned.
 * @returns {Plant[]}
 */
function list(req, res, next) {
  const { limit = 50, skip = 0 } = req.query;
  Plant.list({ limit, skip })
    .then(plants => res.json(plants))
    .catch(e => next(e));
}

/**
 * Delete Plant.
 * @returns {Plant}
 */
function remove(req, res, next) {
  const plant = req.plant;
  plant.remove()
    .then(deletedWork => res.json(deletedWork))
    .catch(e => next(e));
}

export default { load, get, create, update, list, remove };
