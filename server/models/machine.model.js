import Promise from 'bluebird';
import mongoose from 'mongoose';
import httpStatus from 'http-status';
import APIError from '../helpers/APIError';

/**
 * Machine Schema
 */
const MachineSchema = new mongoose.Schema({
  machineId: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true    
  },
  desc: {
    type: String,
    default: ''
  },
  status: {
    type: String,
    default: '0'
  },
  createdAt: {
    type: Date,
    default: Date.now
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
MachineSchema.method({
});

/**
 * Statics
 */
MachineSchema.statics = {
  /**
   * Get Machine
   * @param {ObjectId} id - The objectId of Machine.
   * @returns {Promise<Machine, APIError>}
   */
  get(id) {
    return this.findById(id)
      .exec()
      .then((machine) => {
        if (machine) {
          return machine;
        }
        const err = new APIError('No such Machine exists!', httpStatus.NOT_FOUND);
        return Promise.reject(err);
      });
  },

  /**
   * List Machines in descending order of 'createdAt' timestamp.
   * @param {number} skip - Number of Machines to be skipped.
   * @param {number} limit - Limit number of Machines to be returned.
   * @returns {Promise<Machine[]>}
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
 * @typedef Machine
 */
export default mongoose.model('Machine', MachineSchema);
