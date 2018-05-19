import Promise from 'bluebird';
import mongoose from 'mongoose';
import httpStatus from 'http-status';
import APIError from '../helpers/APIError';

/**
 * Work Schema
 */
const WorkSchema = new mongoose.Schema({
  workId: {
    type: String,
    required: true
  },
  scheduledTime: {
    type: String,
    required: true    
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  processId: {
      type: String,
      required: true
  },
  operationId: {
      type: String,
      required: true
  },
  operationDesc: {
    type: String
  },
  status: {
    type: String,
  }
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
WorkSchema.method({
});

/**
 * Statics
 */
WorkSchema.statics = {
  /**
   * Get Work
   * @param {ObjectId} id - The objectId of Work.
   * @returns {Promise<Work, APIError>}
   */
  get(id) {
    return this.findById(id)
      .exec()
      .then((work) => {
        if (work) {
          return work;
        }
        const err = new APIError('No such work exists!', httpStatus.NOT_FOUND);
        return Promise.reject(err);
      });
  },

  /**
   * List works in descending order of 'createdAt' timestamp.
   * @param {number} skip - Number of works to be skipped.
   * @param {number} limit - Limit number of works to be returned.
   * @returns {Promise<work[]>}
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
 * @typedef Work
 */
export default mongoose.model('Work', WorkSchema);
