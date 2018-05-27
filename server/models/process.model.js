import Promise from 'bluebird';
import mongoose from 'mongoose';
import httpStatus from 'http-status';
import APIError from '../helpers/APIError';

/**
 * Process Schema
 */
var Schema = mongoose.Schema;
const ProcessSchema = new mongoose.Schema({
    name : {type: String, required: true},
    revision : {type: String, required: true},
    rolledUpTime : {type: Number, required: true},
    previousProcessId : {type: Schema.ObjectId, ref: 'Process'},
    nextProcessId		: {type: Schema.ObjectId, ref: 'Process'}
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
ProcessSchema.method({
});

/**
 * Statics
 */
ProcessSchema.statics = {
  /**
   * Get Part
   * @param {ObjectId} id - The objectId of Part.
   * @returns {Promise<Part, APIError>}
   */
  get(id) {
    return this.findById(id)
      .exec()
      .then((Process) => {
        if (Process) {
          return Process;
        }
        const err = new APIError('No such Process exists!', httpStatus.NOT_FOUND);
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
 * @typedef Process
 */
export default mongoose.model('Process', ProcessSchema);
