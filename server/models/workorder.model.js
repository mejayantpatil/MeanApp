import Promise from 'bluebird';
import mongoose from 'mongoose';
import httpStatus from 'http-status';
import APIError from '../helpers/APIError';

/**
 * Workorder Schema
 */
var Schema = mongoose.Schema;
const WorkorderSchema = new mongoose.Schema({
    workorderName : {type : String, require: true},
		workorderDesc : {type : String, require: false},
    clientName : {type : String, require: true},
    priority : {type : String, require: true},
		scheduledStart : {type : Date, require: false},
		scheduledEnd :{type : Date, require: false},
		actualStart :{type : Date, require: false},
		actualEnd :{type : Date, require: false},
		estimatedEfforts :{type : Number, require: false},
		actualEfforts:{type : Number, require: false},
		reasonsForDelay :[{type : String, require: false}],
		scrapCost: {type : Number, require: false}
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
WorkorderSchema.method({
});

/**
 * Statics
 */
WorkorderSchema.statics = {
  /**
   * Get Part
   * @param {ObjectId} id - The objectId of Part.
   * @returns {Promise<Part, APIError>}
   */
  get(id) {
    return this.findById(id)
      .exec()
      .then((Workorder) => {
        if (Workorder) {
          return Workorder;
        }
        const err = new APIError('No such Workorder exists!', httpStatus.NOT_FOUND);
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
 * @typedef Workorder
 */
export default mongoose.model('Workorder', WorkorderSchema);
