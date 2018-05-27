import Promise from 'bluebird';
import mongoose from 'mongoose';
import httpStatus from 'http-status';
import APIError from '../helpers/APIError';

/**
 * Tool Schema
 */
var Schema = mongoose.Schema;
const ToolSchema = new mongoose.Schema({
  instanceId: {type: String, required: true, default: "00"},
  name: {type: String, required: true},
	toolType: {type: String, required: true, enum: ['Cutting', 'Inspection'], default: 'Inspection'},
	plant: {type: Schema.ObjectId, ref: 'Plant', required: false},
	department :{type: Schema.ObjectId, ref: 'Department', required: true},
	make: {type: String, required: false},
	model: {type: String, required: false},
	srnumber: {type: String, required: true},
	toolsizeLength: {type: Number, required: true},
	toolsizeWidth: {type: Number, required: true},
	toolsizeHeight: {type: Number, required: true} 
});

/**
 * Add your
 * - pre-save hooks
 * - validations
 * - virtuals
 */

/**
 * Methods
 */
ToolSchema.method({
});

/**
 * Statics
 */
ToolSchema.statics = {
  /**
   * Get Part
   * @param {ObjectId} id - The objectId of Part.
   * @returns {Promise<Part, APIError>}
   */
  get(id) {
    return this.findById(id)
      .exec()
      .then((Tool) => {
        if (Tool) {
          return Tool;
        }
        const err = new APIError('No such Tool exists!', httpStatus.NOT_FOUND);
        return Promise.reject(err);
      });
  },

  /**
   * List Parts in descending order of 'createdAt' timestamp.
   * @param {number} skip - Number of Parts to be skipped.
   * @param {number} limit - Limit number of Parts to be returned.
   * @returns {Promise<Part[]>}
   */
  list({ skip = 0, limit = 50 } = {}) {
    return this.find()
      .sort({ createdAt: -1 })
      .skip(+skip)
      .limit(+limit)
      .exec();
  }
};

/**
 * @typedef Tool
 */
export default mongoose.model('Tool', ToolSchema);
