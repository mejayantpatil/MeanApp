import Tool from '../models/tool.model';

/**
 * Load Tool and append to req.
 */
function load(req, res, next, id) {
  Tool.get(id)
    .then((tool) => {
      req.tool = tool; // eslint-disable-line no-param-reassign
      return next();
    })
    .catch(e => next(e));
}

/**
 * Get tool
 * @returns {Tool}
 */
function get(req, res) {
  return res.json(req.tool);
}

/**
 * Create new Tool
 * @property {string} req.body.toolId - The tool id of tool.
 * @property {string} req.body.name - The name of tool.
 * @returns {Tool}
 */
function create(req, res, next) {
  const tool = new Tool(req.body);

  tool.save()
    .then(savedTool => res.json(savedTool))
    .catch(e => next(e));
}

/**
 * Update existing tool
 * @property {string} req.body.toolId - The tool id of tool.
 * @property {string} req.body.name - The name of tool.
 * @returns {Tool}
 */
function update(req, res, next) {
  const tool = req.tool;

  tool.instanceId = req.body.instanceId;
  tool.name = req.body.name;
  tool.plant = req.body.plant;
  tool.department = req.body.department;
  tool.make = req.body.make;
  tool.model = req.body.model;
  tool.srnumber = req.body.srnumber;
  tool.toosizeLength = req.body.toolsizeLength;
  tool.toolsizeWidth = req.body.toolsizeWidth;
  tool.toolsizeHeight = req.body.toolsizeHeight;
  tool.save()
    .then(savedTool => res.json(savedTool))
    .catch(e => next(e));
}

/**
 * Get tool order list.
 * @property {number} req.query.skip - Number of tool to be skipped.
 * @property {number} req.query.limit - Limit number of tool to be returned.
 * @returns {Tool[]}
 */
function list(req, res, next) {
  const { limit = 50, skip = 0 } = req.query;
  Tool.list({ limit, skip })
    .then(tools => res.json(tools))
    .catch(e => next(e));
}

/**
 * Delete tool.
 * @returns {Tool}
 */
function remove(req, res, next) {
  const tool = req.tool;
  tool.remove()
    .then(deletedTool => res.json(deletedTool))
    .catch(e => next(e));
}

export default { load, get, create, update, list, remove };
