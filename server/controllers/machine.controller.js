import Machine from '../models/machine.model';

/**
 * Load Machine and append to req.
 */
function load(req, res, next, id) {
  Machine.get(id)
    .then((machine) => {
      req.machine = machine; // eslint-disable-line no-param-reassign
      return next();
    })
    .catch(e => next(e));
}

/**
 * Get machine
 * @returns {Machine}
 */
function get(req, res) {
  return res.json(req.machine);
}

/**
 * Create new Machine
 * @property {string} req.body.machineId - The machine id of machine.
 * @property {string} req.body.name - The name of machine.
 * @returns {Machine}
 */
function create(req, res, next) {
  const machine = new Machine(req.body);

  machine.save()
    .then(savedMachine => res.json(savedMachine))
    .catch(e => next(e));
}

/**
 * Update existing machine
 * @property {string} req.body.machineId - The machine id of machine.
 * @property {string} req.body.name - The name of machine.
 * @returns {Machine}
 */
function update(req, res, next) {
  const machine = req.machine;

  machine.instanceId = req.body.instanceId;
  machine.name = req.body.name;
	// machineType: {type: String, required: true, enum: ['SPM', 'Maintenance', 'CNC', 'PLC'], default: 'Maintenance'},
	// axis: {type: Number, required: true, enum: [2, 2.5, 3, 5], default: 2},
  machine.plant = req.body.plant;
  machine.department = req.body.department;
  machine.hourlycost = req.body.hourlycost;
  machine.make = req.body.make;
  machine.model = req.body.model;
  machine.srnumber = req.body.srnumber;
	machine.jobsizeLength = req.body.jobsizeLength;
	machine.jobsizeWidth = req.body.jobsizeWidth;
	machine.jobsizeHeight = req.body.jobsizeHeight;
  machine.save()
    .then(savedMachine => res.json(savedMachine))
    .catch(e => next(e));
}

/**
 * Get machine order list.
 * @property {number} req.query.skip - Number of machine to be skipped.
 * @property {number} req.query.limit - Limit number of machine to be returned.
 * @returns {Machine[]}
 */
function list(req, res, next) {
  const { limit = 50, skip = 0 } = req.query;
  Machine.list({ limit, skip })
    .then(machines => res.json(machines))
    .catch(e => next(e));
}

/**
 * Delete machine.
 * @returns {Machine}
 */
function remove(req, res, next) {
  const machine = req.machine;
  machine.remove()
    .then(deletedMachine => res.json(deletedMachine))
    .catch(e => next(e));
}

export default { load, get, create, update, list, remove };
