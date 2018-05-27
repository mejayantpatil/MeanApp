import Promise from 'bluebird';
import mongoose from 'mongoose';
import httpStatus from 'http-status';
import APIError from '../helpers/APIError';

/**
 * Department Schema
 */
var Schema = mongoose.Schema;
const DepartmentSchema = new mongoose.Schema({
    name: {type: String, required: true},
    shop: {type: String, required: true},
    // Plant, where department belongs
    plant: {type: Schema.ObjectId, ref: 'Plant'}
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
DepartmentSchema.method({
});

/**
 * Statics
 */
DepartmentSchema.statics = {
  /**
   * Get Department
   * @param {ObjectId} id - The objectId of Department.
   * @returns {Promise<Department, APIError>}
   */
  get(id) {
    return this.findById(id)
      .exec()
      .then((Department) => {
        if (Department) {
          return Department;
        }
        const err = new APIError('No such Department exists!', httpStatus.NOT_FOUND);
        return Promise.reject(err);
      });
  },

  /**
   * List Machines in descending order of 'createdAt' timestamp.
   * @param {number} skip - Number of Machines to be skipped.
   * @param {number} limit - Limit number of Machines to be returned.
   * @returns {Promise<Department[]>}
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
 * @typedef Department
 */
export default mongoose.model('Department', DepartmentSchema);
